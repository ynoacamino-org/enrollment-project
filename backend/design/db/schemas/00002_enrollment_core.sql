-- +goose Up
-- +goose StatementBegin

CREATE TABLE institution (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) UNIQUE NOT NULL,
    logo_url VARCHAR(255)
);

CREATE TABLE process (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    start_day DATE NOT NULL,
    end_day DATE NOT NULL,
    institution_id INTEGER NOT NULL,
    FOREIGN KEY (institution_id) REFERENCES institution (id) ON DELETE RESTRICT,
    CONSTRAINT process_dates CHECK (start_day < end_day)
);

CREATE TABLE student_group (
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    priority SMALLINT NOT NULL,
    start_day DATE NOT NULL,
    end_day DATE NOT NULL,
    process_id INTEGER NOT NULL,
    FOREIGN KEY (process_id) REFERENCES process (id) ON DELETE RESTRICT,
    CONSTRAINT student_group_dates CHECK (start_day < end_day)
);

CREATE TABLE installation (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    credits SMALLINT NOT NULL,
    cycle_number SMALLINT NOT NULL,
    process_id INTEGER NOT NULL,
    FOREIGN KEY (process_id) REFERENCES process (id) ON DELETE RESTRICT,
    CONSTRAINT credits_value CHECK (credits > 0),
    CONSTRAINT cycle_number_value CHECK (cycle_number > 0)
);

CREATE TABLE modality (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    code VARCHAR(30) UNIQUE NOT NULL,
    account_id INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account (id) ON DELETE CASCADE
);

CREATE TABLE speaker (
    id SERIAL PRIMARY KEY,
    account_id INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account (id) ON DELETE CASCADE
);

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS student_group;

DROP TABLE IF EXISTS speaker;

DROP TABLE IF EXISTS student;

DROP TABLE IF EXISTS modality;

DROP TABLE IF EXISTS course;

DROP TABLE IF EXISTS process;

DROP TABLE IF EXISTS installation;

DROP TABLE IF EXISTS institution;

-- +goose StatementEnd
