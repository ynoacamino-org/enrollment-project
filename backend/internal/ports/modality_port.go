package ports

import (
	"context"

	"github.com/enrollment/gen/db"
)

type ModalityRepositoryInterface interface {
	CreateModality(ctx context.Context, name string) error
	ListModalities(ctx context.Context) ([]db.Modality, error)
	DeleteModality(ctx context.Context, id int32) error
	UpdateModality(ctx context.Context, arg db.UpdateModalityParams) error
}
