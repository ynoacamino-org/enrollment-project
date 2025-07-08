-- +goose Up
-- +goose StatementBegin



CREATE TABLE administrative (
    id SERIAL PRIMARY KEY,
    account_id INTEGER UNIQUE NOT NULL,
    process_id INTEGER NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account (id) ON DELETE CASCADE,
    FOREIGN KEY (process_id) REFERENCES process (id) ON DELETE RESTRICT
);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

DROP TABLE IF EXISTS administrative;

-- +goose StatementEnd
