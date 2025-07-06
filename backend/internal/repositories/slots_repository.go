package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type SlotsRepository struct {
	*db.Queries
}

func NewSlotsRepository(pool *pgxpool.Pool) ports.SlotsRepositoryInterface {
	return &SlotsRepository{
		Queries: db.New(pool),
	}
}
