package ports

import (
	"context"

	"github.com/enrollment/gen/db"
)

type CourseRepositoryInterface interface {
	CreateCourse(ctx context.Context, arg db.CreateCourseParams) error
	DeleteCourse(ctx context.Context, id int32) error
	ListCourses(ctx context.Context) ([]db.Course, error)
	UpdateCourse(ctx context.Context, arg db.UpdateCourseParams) error
	ListAllCoursesAvailableByStudentInProcess(ctx context.Context, arg db.ListAllCoursesAvailableByStudentInProcessParams) ([]db.ListAllCoursesAvailableByStudentInProcessRow, error)
	CreateStudentAvailableCourse(ctx context.Context, arg db.CreateStudentAvailableCourseParams) error
	ListAllCoursesByProcessId(ctx context.Context, processID int32) ([]db.Course, error)
}
