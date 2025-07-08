package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProcessRepository struct {
	*db.Queries
}

func NewProcessRepository(pool *pgxpool.Pool) ports.ProcessRepositoryInterface {
	return &ProcessRepository{
		Queries: db.New(pool),
	}
}
