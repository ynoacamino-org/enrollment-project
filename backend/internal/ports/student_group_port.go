package ports

import (
	"context"

	"github.com/enrollment/gen/db"
)

type StudentGroupRepositoryInterface interface {
	CreateStudentGroup(ctx context.Context, arg db.CreateStudentGroupParams) error
	ListStudentGroups(ctx context.Context) ([]db.StudentGroup, error)
	DeleteStudentGroup(ctx context.Context, id int16) error
	UpdateStudentGroup(ctx context.Context, arg db.UpdateStudentGroupParams) error
}
