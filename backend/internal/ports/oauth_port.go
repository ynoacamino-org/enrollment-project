package ports

import (
	"context"

	"github.com/enrollment/gen/db"
	"github.com/jackc/pgx/v5/pgtype"
)

type OauthRepositoryInterface interface {
	GetAccountById(ctx context.Context, id int32) (db.Account, error)
	GetSessionByToken(ctx context.Context, token string) (db.AccountSession, error)
	GetAccountByAccessToken(ctx context.Context, accessToken pgtype.Text) (db.Account, error)
	GetAccountByEmail(ctx context.Context, email string) (db.Account, error)
	FullListAccounts(ctx context.Context) ([]db.Account, error)
	ListAccounts(ctx context.Context, arg db.ListAccountsParams) ([]db.Account, error)
	CreateAccount(ctx context.Context, arg db.CreateAccountParams) error
	CreateAccountSession(ctx context.Context, arg db.CreateAccountSessionParams) (db.AccountSession, error)
	CreateOauthProvider(ctx context.Context, name string) error
	CreateAccountWithProviderName(ctx context.Context, arg db.CreateAccountWithProviderNameParams) error
	DeleteAccountByToken(ctx context.Context, token string) error
}
