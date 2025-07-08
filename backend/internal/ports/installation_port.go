package ports

import (
	"context"

	"github.com/enrollment/gen/db"
)

type InstallationRepositoryInterface interface {
	CreateInstalation(ctx context.Context, arg db.CreateInstalationParams) error
	DeleteInstallation(ctx context.Context, id int32) error
	ListInstallations(ctx context.Context) ([]db.Installation, error)
	UpdateInstallation(ctx context.Context, arg db.UpdateInstallationParams) error
}
