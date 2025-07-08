package ports

import (
	"context"

	"github.com/enrollment/gen/db"
)

type SpeakerRepositoryInterface interface {
	CreateSpeaker(ctx context.Context, accountID int32) error
	FullListSpeakers(ctx context.Context) ([]db.FullListSpeakersRow, error)
	ListSpeakers(ctx context.Context, arg db.ListSpeakersParams) ([]db.ListSpeakersRow, error)
}
