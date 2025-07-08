package ports

import (
	"context"

	"github.com/enrollment/gen/db"
)

type SlotsRepositoryInterface interface {
	CreateSlot(ctx context.Context, slot db.CreateSlotParams) error
	DeleteSlot(ctx context.Context, id int32) error
	UpdateSlot(ctx context.Context, arg db.UpdateSlotParams) error
	UpdateTakenPlacesSlot(ctx context.Context, arg db.UpdateTakenPlacesSlotParams) (db.Slot, error)
}
