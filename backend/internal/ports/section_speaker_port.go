package ports

import (
	"context"

	"github.com/enrollment/gen/db"
	"github.com/jackc/pgx/v5/pgtype"
)

type SectionSpeakerRepositoryInterface interface {
	CreateSectionSpeaker(ctx context.Context, arg db.CreateSectionSpeakerParams) error
	DeleteSectionSpeaker(ctx context.Context, arg db.DeleteSectionSpeakerParams) error
	ListSectionSpeakers(ctx context.Context, sectionID pgtype.Int4) ([]db.ListSectionSpeakersRow, error)
	ListSectionSpeakersByCourse(ctx context.Context, courseID int32) ([]db.ListSectionSpeakersByCourseRow, error)
	ListSectionSpeakersBySpeaker(ctx context.Context, speakerID pgtype.Int4) ([]db.ListSectionSpeakersBySpeakerRow, error)
}
