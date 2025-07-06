package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type StudentRepository struct {
	*db.Queries
}

func NewStudentRepository(pool *pgxpool.Pool) ports.StudentRepositoryInterface {
	return &StudentRepository{
		Queries: db.New(pool),
	}
}
