package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type SectionRepository struct {
	*db.Queries
}

func NewSectionRepository(pool *pgxpool.Pool) ports.SectionRepositoryInterface {
	return &SectionRepository{
		Queries: db.New(pool),
	}
}
