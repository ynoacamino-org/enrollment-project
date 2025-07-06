package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type EventRepository struct {
	*db.Queries
}

func NewEventRepository(pool *pgxpool.Pool) ports.EventRepositoryInterface {
	return &EventRepository{
		Queries: db.New(pool),
	}
}
