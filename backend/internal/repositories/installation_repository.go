package repositories

import (
	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jackc/pgx/v5/pgxpool"
)

type InstallationRepository struct {
	*db.Queries
}

func NewInstallationRepository(pool *pgxpool.Pool) ports.InstallationRepositoryInterface {
	return &InstallationRepository{
		Queries: db.New(pool),
	}
}
