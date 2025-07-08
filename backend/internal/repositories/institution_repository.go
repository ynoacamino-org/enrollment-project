package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type InstitutionRepository struct {
	*db.Queries
}

func NewInstitutionRepository(pool *pgxpool.Pool) ports.InstitutionRepositoryInterface {
	return &InstitutionRepository{
		Queries: db.New(pool),
	}
}
