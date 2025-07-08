package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ModalityRepository struct {
	*db.Queries
}

func NewModalityRepository(pool *pgxpool.Pool) ports.ModalityRepositoryInterface {
	return &ModalityRepository{
		Queries: db.New(pool),
	}
}
