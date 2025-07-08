package main

import (
	"fmt"
	"log"
	"math/rand"
	"strings"
	"time"

	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jaswdr/faker"
	"golang.org/x/net/context"
)

const (
	VIRTUAL_MODALITY    string = "virtual"
	PRESENTIAL_MODALITY string = "presential"
	HYBRID_MODALITY     string = "hybrid"
)

const (
	NUM_STUDENTS int = NUM_ACCOUNTS - 10
)

var MODALITIES [3]string = [3]string{VIRTUAL_MODALITY, PRESENTIAL_MODALITY, HYBRID_MODALITY}

func createRandomStudent(faker faker.Faker, account db.Account) (db.CreateStudentParams, error) {
	return db.CreateStudentParams{
		AccountID: account.ID,
		Code:      faker.Person().SSN(),
	}, nil
}

func createRandomProcess(faker faker.Faker, institution db.Institution) db.CreateProcessParams {
	name := strings.Join(faker.Lorem().Words(2), " ")

	randomNumberDay := rand.Intn(14)

	startDay := time.Now().AddDate(0, 0, randomNumberDay-7)
	endDay := startDay.AddDate(0, 0, randomNumberDay+7)

	return db.CreateProcessParams{
		Name: name,
		StartDay: pgtype.Date{
			Time:  startDay,
			Valid: true,
		},
		EndDay: pgtype.Date{
			Time:  endDay,
			Valid: true,
		},
		InstitutionID: institution.ID,
	}
}

func createRandomCourse(faker faker.Faker, process db.Process) db.CreateCourseParams {
	return db.CreateCourseParams{
		Name:        strings.Join(faker.Lorem().Words(2), " "),
		Credits:     int16(rand.Intn(5) + 1),
		CycleNumber: int16(rand.Intn(5) + 1),
		ProcessID:   process.ID,
	}
}

func createRandomInstallation(faker faker.Faker) db.CreateInstalationParams {
	return db.CreateInstalationParams{
		Name: faker.Company().Name(),
		Description: pgtype.Text{
			String: faker.Lorem().Sentence(10),
			Valid:  true,
		},
	}
}

func createStudentGroup(priority int16, process db.Process) db.CreateStudentGroupParams {
	return db.CreateStudentGroupParams{
		Name:     fmt.Sprintf("Group %d", priority),
		Priority: priority,
		StartDay: pgtype.Date{
			Time:  time.Now().AddDate(0, 0, int(priority*7)),
			Valid: true,
		},
		EndDay: pgtype.Date{
			Time:  time.Now().AddDate(0, 0, int(priority*7)+6),
			Valid: true,
		},
		ProcessID: process.ID,
	}
}

func createRandomInstitution(faker faker.Faker) db.CreateInstitutionParams {
	return db.CreateInstitutionParams{
		Name: faker.Company().Name(),
		LogoUrl: pgtype.Text{
			String: faker.Internet().URL(),
			Valid:  true,
		},
	}
}

func seedEnrollmentCoreTables(
	ctx context.Context,
	institutionRepo ports.InstitutionRepositoryInterface,
	studentGroupRepo ports.StudentGroupRepositoryInterface,
	installationRepo ports.InstallationRepositoryInterface,
	courseRepo ports.CourseRepositoryInterface,
	processRepo ports.ProcessRepositoryInterface,
	modalityRepo ports.ModalityRepositoryInterface,
	oauthRepo ports.OauthRepositoryInterface,
	studentRepo ports.StudentRepositoryInterface,
	speakerRepo ports.SpeakerRepositoryInterface,
) {
	faker := faker.New()

	log.Println("Seeding institutions...")
	for range 5 {
		institution := createRandomInstitution(faker)
		err := institutionRepo.CreateInstitution(ctx, institution)
		if err != nil {
			log.Fatalf("Failed to create institution: %v", err)
		}
	}

	institutions, err := institutionRepo.ListAllInstitutions(ctx)
	if err != nil {
		log.Fatalf("Failed to list institutions: %v", err)
	}
	log.Println("Seeding processes...")
	for range 20 {
		institution := institutions[rand.Intn(len(institutions))]
		process := createRandomProcess(faker, institution)
		err := processRepo.CreateProcess(ctx, process)
		if err != nil {
			log.Fatalf("Failed to create processw: %v", err)
		}
	}

	log.Println("Seeding student groups...")

	process, err := processRepo.ListAllProcess(ctx)
	if err != nil {
		log.Fatalf("Failed to list processes: %v", err)
	}
	for _, p := range process {
		for i := range 5 {
			studentGroup := createStudentGroup(int16(i+1), p)
			err := studentGroupRepo.CreateStudentGroup(ctx, studentGroup)
			if err != nil {
				log.Fatalf("Failed to create student group: %v", err)
			}
		}
	}

	log.Println("Seeding installations...")
	for range 40 {
		installation := createRandomInstallation(faker)
		err := installationRepo.CreateInstalation(ctx, installation)
		if err != nil {
			log.Fatalf("Failed to create installation: %v", err)
		}
	}

	log.Println("Seeding courses...")
	processes, err := processRepo.ListAllProcess(ctx)
	if err != nil {
		log.Fatalf("Failed to list processes: %v", err)
	}
	for range 400 {
		process := processes[rand.Intn(len(processes))]
		course := createRandomCourse(faker, process)
		err := courseRepo.CreateCourse(ctx, course)
		if err != nil {
			log.Fatalf("Failed to create course: %v", err)
		}
	}

	log.Println("Seeding modalities...")
	for _, modality := range MODALITIES {
		err := modalityRepo.CreateModality(ctx, modality)
		if err != nil {
			log.Fatalf("Failed to create modality %s: %v", modality, err)
		}
	}

	log.Print("Seeding students...")
	accounts, err := oauthRepo.ListAccounts(ctx, db.ListAccountsParams{
		Limit:  int32(NUM_STUDENTS),
		Offset: 0,
	})
	if err != nil {
		log.Fatalf("Failed to list accounts: %v", err)
	}
	for _, account := range accounts {
		student, err := createRandomStudent(faker, account)
		if err != nil {
			log.Fatalf("Failed to create student: %v", err)
		}
		err = studentRepo.CreateStudent(ctx, student)
		if err != nil {
			log.Fatalf("Failed to create student for account %d: %v", account.ID, err)
		}
	}

	log.Println("Seeding skeapers...")
	accounts, err = oauthRepo.ListAccounts(ctx, db.ListAccountsParams{
		Limit:  int32(NUM_ACCOUNTS),
		Offset: int32(NUM_STUDENTS),
	})
	if err != nil {
		log.Fatalf("Failed to list accounts: %v", err)
	}
	for _, account := range accounts {
		err = speakerRepo.CreateSpeaker(ctx, account.ID)
		if err != nil {
			log.Fatalf("Failed to create skeaper for account %d: %v", account.ID, err)
		}
	}
}
