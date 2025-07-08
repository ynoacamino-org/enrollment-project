package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type StudentProcessRepository struct {
	*db.Queries
}

func NewStudentProcessRepository(pool *pgxpool.Pool) ports.StudentProcessRepositoryInterface {
	return &StudentProcessRepository{
		Queries: db.New(pool),
	}
}
