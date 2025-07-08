package ports

import (
	"context"

	"github.com/enrollment/gen/db"
)

type EventRepositoryInterface interface {
	CreateEvent(ctx context.Context, arg db.CreateEventParams) error
	DeleteEvent(ctx context.Context, id int32) error
	ListEventsSection(ctx context.Context, id int32) ([]db.Event, error)
	UpdateEvent(ctx context.Context, arg db.UpdateEventParams) error
}
