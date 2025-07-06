package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type OauthRepository struct {
	*db.Queries
}

func NewOauthRepository(pool *pgxpool.Pool) ports.OauthRepositoryInterface {
	return &OauthRepository{
		Queries: db.New(pool),
	}
}
