package ports

import (
	"context"

	"github.com/enrollment/gen/db"
)

type StudentRepositoryInterface interface {
	CreateStudent(ctx context.Context, arg db.CreateStudentParams) error
	FullListStudents(ctx context.Context) ([]db.FullListStudentsRow, error)
	ListStudents(ctx context.Context, arg db.ListStudentsParams) ([]db.ListStudentsRow, error)
	GetStudentIdByToken(ctx context.Context, token string) (int32, error)
}
