package ports

import (
	"context"

	"github.com/enrollment/gen/db"
)

type SectionRepositoryInterface interface {
	CreateSection(ctx context.Context, section db.CreateSectionParams) error
	ListSections(ctx context.Context) ([]db.Section, error)
	ListPopulateSections(ctx context.Context) ([]db.ListPopulateSectionsRow, error)
	UpdateSection(ctx context.Context, arg db.UpdateSectionParams) error
	DeleteSection(ctx context.Context, id int32) error
	ListDetailedSectionByCourseId(ctx context.Context, arg db.ListDetailedSectionByCourseIdParams) ([]db.ListDetailedSectionByCourseIdRow, error)
}
