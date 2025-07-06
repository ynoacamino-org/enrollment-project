package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type CourseRepository struct {
	*db.Queries
}

func NewCourseRepository(pool *pgxpool.Pool) ports.CourseRepositoryInterface {
	return &CourseRepository{
		Queries: db.New(pool),
	}
}
