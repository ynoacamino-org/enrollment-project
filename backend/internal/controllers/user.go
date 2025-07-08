package controllers

// import (
// 	"context"

// 	"github.com/enrollment/config"
// 	user "github.com/enrollment/gen/user"
// 	"github.com/enrollment/internal/ports"
// 	"goa.design/clue/log"
// )

// user service example implementation.
// The example methods log the requests and return zero values.

// type usersrvc struct {
// 	AdminRepository        ports.AdministrativeRepositoryInterface
// 	StudentMajorRepository ports.StudentMajorRepositoryInterface
// 	SpeakerRepository      ports.SpeakerRepositoryInterface
// 	FrontendURL            string
// }

// NewUser returns the user service implementation.

// func NewUser(cfg *config.MainConfig, adminRepository ports.AdministrativeRepositoryInterface, studentMajor ports.StudentMajorRepositoryInterface, speakerRepository ports.SpeakerRepositoryInterface) user.Service {
// 	return &usersrvc{
// 		AdminRepository:        adminRepository,
// 		StudentMajorRepository: studentMajor,
// 		SpeakerRepository:      speakerRepository,
// 		FrontendURL:            cfg.FrontendURL,
// 	}
// }

// Get all majors available for the user

// func (s *usersrvc) GetAllMajors(ctx context.Context) (res *user.RoleMajors, err error) {
// 	//admin_majors := s.
// 	res = &user.RoleMajors{}
// 	log.Printf(ctx, "user.get_all_majors")
// 	return
// }
