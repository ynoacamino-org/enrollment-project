package ports

import (
	"context"

	"github.com/enrollment/gen/db"
)

type ProcessRepositoryInterface interface {
	CreateProcess(ctx context.Context, args db.CreateProcessParams) error
	ListAllProcess(ctx context.Context) ([]db.Process, error)
	DeleteProcess(ctx context.Context, id int32) error
	ListProcessByInstitutionId(ctx context.Context, arg db.ListProcessByInstitutionIdParams) ([]db.Process, error)
	ListProcessByStudentId(ctx context.Context, id int32) ([]db.Process, error)
	GetProcessById(ctx context.Context, id int32) (db.Process, error)
}
