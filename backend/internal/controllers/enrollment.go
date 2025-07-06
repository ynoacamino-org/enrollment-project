package controllers

import (
	"context"
	"fmt"

	"github.com/enrollment/gen/db"
	enrollment "github.com/enrollment/gen/enrollment"
	"github.com/enrollment/internal/ports"
	"github.com/enrollment/internal/utils"
)

type enrollmentsrvc struct {
	OauthRepo       ports.OauthRepositoryInterface
	InstitutionRepo ports.InstitutionRepositoryInterface
	ProcessRepo     ports.ProcessRepositoryInterface
	StudentRepo     ports.StudentRepositoryInterface
	CourseRepo      ports.CourseRepositoryInterface
	SectionRepo     ports.SectionRepositoryInterface
}

func NewInstitution(oauthRepo ports.OauthRepositoryInterface, institutionRepo ports.InstitutionRepositoryInterface, processRepo ports.ProcessRepositoryInterface, studentRepo ports.StudentRepositoryInterface, courseRepo ports.CourseRepositoryInterface, sectionRepo ports.SectionRepositoryInterface) enrollment.Service {
	return &enrollmentsrvc{
		OauthRepo:       oauthRepo,
		InstitutionRepo: institutionRepo,
		ProcessRepo:     processRepo,
		StudentRepo:     studentRepo,
		CourseRepo:      courseRepo,
		SectionRepo:     sectionRepo,
	}
}

func (s *enrollmentsrvc) ListInstitutions(ctx context.Context) ([]*enrollment.Institution, error) {
	token := utils.GetTokenFromContext(ctx)

	session, err := s.OauthRepo.GetSessionByToken(ctx, token)
	if err != nil {
		return nil, enrollment.MakeNotAuthorized(fmt.Errorf("failed to get session by token: %w", err))
	}

	institutions, err := s.InstitutionRepo.ListInstitutionsByAccountID(ctx, session.AccountID)
	if err != nil {
		return nil, enrollment.MakeInternalServerError(fmt.Errorf("failed to list institutions: %w", err))
	}

	institutionsByAccount := make([]*enrollment.Institution, 0, len(institutions))

	for _, inst := range institutions {
		institutionsByAccount = append(institutionsByAccount, &enrollment.Institution{
			ID:      inst.ID,
			Name:    inst.Name,
			LogoURL: &inst.LogoUrl.String,
		})
	}

	return institutionsByAccount, nil
}

func (s *enrollmentsrvc) ListProccesByInstitution(ctx context.Context, payload *enrollment.ListProccesByInstitutionPayload) (*enrollment.ListProccesByInstitutionResult, error) {
	token := utils.GetTokenFromContext(ctx)

	session, err := s.OauthRepo.GetSessionByToken(ctx, token)
	if err != nil {
		return nil, enrollment.MakeNotAuthorized(fmt.Errorf("failed to get session by token: %w", err))
	}

	instChan := utils.Async(func() (db.Institution, error) {
		return s.InstitutionRepo.GetInstitutionByID(ctx, payload.InstitutionID)
	})
	processesChan := utils.Async(func() ([]db.Process, error) {
		return s.ProcessRepo.ListProcessByInstitutionId(ctx, db.ListProcessByInstitutionIdParams{
			ID:            session.AccountID,
			InstitutionID: payload.InstitutionID,
		})
	})

	instAsync := <-instChan
	processesAsync := <-processesChan

	if instAsync.Err != nil {
		return nil, enrollment.MakeInternalServerError(fmt.Errorf("failed to get institution by ID: %w", instAsync.Err))
	}
	inst := instAsync.Value
	if processesAsync.Err != nil {
		return nil, enrollment.MakeInternalServerError(fmt.Errorf("failed to list processes: %w", processesAsync.Err))
	}
	processes := processesAsync.Value

	processesByInstitution := make([]*enrollment.Process, 0, len(processes))
	for _, proc := range processes {
		startDay := proc.StartDay.Time.Unix()
		endDay := proc.EndDay.Time.Unix()

		processesByInstitution = append(processesByInstitution, &enrollment.Process{
			ID:            &proc.ID,
			Name:          &proc.Name,
			StartDay:      &startDay,
			EndDay:        &endDay,
			InstitutionID: &proc.InstitutionID,
		})
	}

	return &enrollment.ListProccesByInstitutionResult{
		Processes: processesByInstitution,
		ID:        inst.ID,
		Name:      inst.Name,
		LogoURL:   &inst.LogoUrl.String,
	}, nil
}

// List all courses available for a student in a specific process
func (s *enrollmentsrvc) ListAllCoursesAvailableByStudentInProcess(ctx context.Context, p *enrollment.ListAllCoursesAvailableByStudentInProcessPayload) (*enrollment.ListAllCoursesAvailableByStudentInProcessResult, error) {
	token := utils.GetTokenFromContext(ctx)
	_, err := s.OauthRepo.GetSessionByToken(ctx, token)
	if err != nil {
		return nil, enrollment.MakeNotAuthorized(fmt.Errorf("failed to get session by token: %w", err))
	}

	studentId, err := s.StudentRepo.GetStudentIdByToken(ctx, token)
	if err != nil {
		return nil, enrollment.MakeInternalServerError(fmt.Errorf("failed to get student ID by token: %w", err))
	}

	process, err := s.ProcessRepo.GetProcessById(ctx, p.ProcessID)
	if err != nil {
		return nil, enrollment.MakeInternalServerError(fmt.Errorf("failed to get process by ID: %w", err))
	}
	processStartDayUnix := process.StartDay.Time.Unix()
	processEndDayUnix := process.EndDay.Time.Unix()

	raw_courses, err := s.CourseRepo.ListAllCoursesAvailableByStudentInProcess(ctx, db.ListAllCoursesAvailableByStudentInProcessParams{
		StudentID: studentId,
		ProcessID: p.ProcessID,
	})

	if err != nil {
		return nil, enrollment.MakeInternalServerError(fmt.Errorf("failed to list courses: %w", err))
	}

	coursesAvailable := make([]*enrollment.Course, 0, len(raw_courses))
	for _, course := range raw_courses {
		coursesAvailable = append(coursesAvailable, &enrollment.Course{
			ID:          int(course.CourseID),
			Name:        course.CourseName,
			Credits:     int(course.Credits),
			CicleNumber: int(course.CycleNumber),
		})
	}

	return &enrollment.ListAllCoursesAvailableByStudentInProcessResult{
		Courses:       coursesAvailable,
		ID:            &process.ID,
		Name:          &process.Name,
		StartDay:      &processStartDayUnix,
		EndDay:        &processEndDayUnix,
		InstitutionID: &process.InstitutionID,
	}, nil
}

func (s *enrollmentsrvc) ExpandCourse(ctx context.Context, p *enrollment.ExpandCoursePayload) ([]*enrollment.SectionWithEvents, error) {
	token := utils.GetTokenFromContext(ctx)
	_, err := s.OauthRepo.GetSessionByToken(ctx, token)
	if err != nil {
		return nil, enrollment.MakeNotAuthorized(fmt.Errorf("failed to get session by token: %w", err))
	}

	mapSecIdx := map[int32]int{}

	studentId, err := s.StudentRepo.GetStudentIdByToken(ctx, token)
	if err != nil {
		return nil, enrollment.MakeInternalServerError(fmt.Errorf("failed to get student ID by token: %w", err))
	}

	rows, err := s.SectionRepo.ListDetailedSectionByCourseId(ctx, db.ListDetailedSectionByCourseIdParams{
		CourseID:  p.CourseID,
		StudentID: studentId,
	})
	if err != nil {
		return nil, enrollment.MakeInternalServerError(fmt.Errorf("failed to list detailed sections by course ID: %w", err))
	}

	res := make([]*enrollment.SectionWithEvents, 0, len(rows))

	for _, row := range rows {
		idx, exists := mapSecIdx[row.SectionID]
		if !exists {
			idx = len(res)
			mapSecIdx[row.SectionID] = idx
			res = append(res, &enrollment.SectionWithEvents{
				ID:          int(row.SectionID),
				SectionName: row.SectionName,
				TakenPlaces: int(row.TakenPlaces),
				TotalPlaces: int(row.TotalPlaces),
				Events:      []*enrollment.DetailedEvent{},
			})
		}

		if row.EventID.Valid {
			res[idx].Events = append(res[idx].Events, &enrollment.DetailedEvent{
				ID:               int(row.EventID.Int32),
				StartDate:        row.StartDate.Time.Unix(),
				EndDate:          row.EndDate.Time.Unix(),
				SectionID:        int(row.SectionID),
				InstallationID:   int(row.InstallationID.Int32),
				InstallationName: row.InstallationName.String,
				ModalityID:       int(row.ModalityID.Int32),
				ModalityName:     row.ModalityName.String,
			})
		}
	}

	if len(res) == 0 {
		return nil, enrollment.MakeNotAuthorized(fmt.Errorf("no sections found for course ID %d", p.CourseID))
	}

	return res, nil
}
