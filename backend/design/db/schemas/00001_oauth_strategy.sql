-- +goose Up
-- +goose StatementBegin
CREATE TABLE oauth_provider (
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    oauth_provider_id SMALLINT NULL,
    access_token TEXT,
    refresh_token TEXT,
    FOREIGN KEY (oauth_provider_id) REFERENCES oauth_provider (id) ON DELETE SET NULL
);

CREATE TABLE account_session (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL UNIQUE,
    expiration_date TIMESTAMPTZ NOT NULL,
    user_agent TEXT NOT NULL,
    ip_address TEXT NOT NULL,
    account_id INTEGER NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account (id) ON DELETE CASCADE
);

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS account_session;

DROP TABLE IF EXISTS account;

DROP TABLE IF EXISTS oauth_provider;

-- +goose StatementEnd
