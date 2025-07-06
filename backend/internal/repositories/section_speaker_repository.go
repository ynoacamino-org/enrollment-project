package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type SectionSpeakerRepository struct {
	*db.Queries
}

func NewSectionSpeakerRepository(pool *pgxpool.Pool) ports.SectionSpeakerRepositoryInterface {
	return &SectionSpeakerRepository{
		Queries: db.New(pool),
	}
}
