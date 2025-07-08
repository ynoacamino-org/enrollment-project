package ports

import (
	"context"

	"github.com/enrollment/gen/db"
)

type StudentProcessRepositoryInterface interface {
	CreateStudentProcess(ctx context.Context, arg db.CreateStudentProcessParams) error
	DeleteStudentProcess(ctx context.Context, arg db.DeleteStudentProcessParams) error
	ListProcessByStudent(ctx context.Context, studentID int32) ([]db.ListProcessByStudentRow, error)
	ListStudentByProcess(ctx context.Context, processID int32) ([]db.ListStudentByProcessRow, error)
	ListStudentProcess(ctx context.Context, studentID int32) ([]db.ListStudentProcessRow, error)
}
