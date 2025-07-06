package db

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

type ConnectDBConfig interface {
	GetConnectDBConfig() (string, context.Context)
}

func ConnectDB(cfg ConnectDBConfig) (*pgxpool.Pool, error) {
	databaseURL, ctx := cfg.GetConnectDBConfig()

	poolConfig, err := pgxpool.ParseConfig(databaseURL)
	if err != nil {
		return nil, fmt.Errorf("failed to parse database URL: %w", err)
	}

	if os.Getenv("APP_ENV") == "production" {
		poolConfig.MaxConns = 500
		poolConfig.MinConns = 50
	} else {
		poolConfig.MaxConns = 20
		poolConfig.MinConns = 5
	}

	pool, err := pgxpool.NewWithConfig(ctx, poolConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create connection pool: %w", err)
	}

	return pool, nil
}
