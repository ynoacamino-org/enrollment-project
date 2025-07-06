package ports

import (
	"context"

	"github.com/enrollment/gen/db"
)

type InstitutionRepositoryInterface interface {
	CreateInstitution(ctx context.Context, arg db.CreateInstitutionParams) error
	ListAllInstitutions(ctx context.Context) ([]db.Institution, error)
	ListInstitutionsByAccountID(ctx context.Context, id int32) ([]db.Institution, error)
	GetInstitutionByID(ctx context.Context, id int32) (db.Institution, error)
}
