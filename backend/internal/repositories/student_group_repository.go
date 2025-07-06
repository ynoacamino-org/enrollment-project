package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type StudentGroupRepository struct {
	*db.Queries
}

func NewStudentGroupRepository(pool *pgxpool.Pool) ports.StudentGroupRepositoryInterface {
	return &StudentGroupRepository{
		Queries: db.New(pool),
	}
}
