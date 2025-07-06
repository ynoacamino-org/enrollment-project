package main

import (
	"github.com/enrollment/config"
	"github.com/enrollment/internal/db"
	"github.com/enrollment/internal/repositories"
)

func main() {
	cfg, err := config.NewSeedConfig()
	if err != nil {
		panic(err)
	}

	pool, err := db.ConnectDB(cfg)
	if err != nil {
		panic(err)
	}

	var (
		oauthRepo          = repositories.NewOauthRepository(pool)
		studentGroupRepo   = repositories.NewStudentGroupRepository(pool)
		installationRepo   = repositories.NewInstallationRepository(pool)
		courseRepo         = repositories.NewCourseRepository(pool)
		processRepo        = repositories.NewProcessRepository(pool)
		modalityRepo       = repositories.NewModalityRepository(pool)
		studentRepo        = repositories.NewStudentRepository(pool)
		speakerRepo        = repositories.NewSpeakerRepository(pool)
		studentProcessRepo = repositories.NewStudentProcessRepository(pool)
		sectionSpeakerRepo = repositories.NewSectionSpeakerRepository(pool)
		sectionRepo        = repositories.NewSectionRepository(pool)
		slotsRepo          = repositories.NewSlotsRepository(pool)
		eventRepo          = repositories.NewEventRepository(pool)
		insstitutionRepo   = repositories.NewInstitutionRepository(pool)
	)

	seedOauthTables(
		cfg.Ctx,
		oauthRepo,
	)
	seedEnrollmentCoreTables(
		cfg.Ctx,
		insstitutionRepo,
		studentGroupRepo,
		installationRepo,
		courseRepo,
		processRepo,
		modalityRepo,
		oauthRepo,
		studentRepo,
		speakerRepo,
	)
	seedEnrollmentProcessTables(
		cfg.Ctx,
		courseRepo,
		sectionRepo,
		slotsRepo,
		installationRepo,
		eventRepo,
		modalityRepo,
		studentRepo,
		processRepo,
		studentProcessRepo,
		speakerRepo,
		sectionSpeakerRepo,
	)
}
