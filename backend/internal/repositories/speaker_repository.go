package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type SpeakerRepository struct {
	*db.Queries
}

func NewSpeakerRepository(pool *pgxpool.Pool) ports.SpeakerRepositoryInterface {
	return &SpeakerRepository{
		Queries: db.New(pool),
	}
}
