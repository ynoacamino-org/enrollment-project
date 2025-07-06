-- +goose Up
-- +goose StatementBegin

CREATE TABLE section (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    course_id INTEGER NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course (id) ON DELETE CASCADE
);

CREATE TABLE slots (
    id SERIAL PRIMARY KEY,
    total_places INTEGER NOT NULL,
    taken_places INTEGER NOT NULL,
    section_id INTEGER NOT NULL,
    FOREIGN KEY (section_id) REFERENCES section (id) ON DELETE CASCADE
);

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    section_id INTEGER NOT NULL,
    installation_id INTEGER NOT NULL,
    modality_id INTEGER NOT NULL,

    FOREIGN KEY (modality_id) REFERENCES modality (id) ON DELETE RESTRICT,
    FOREIGN KEY (section_id) REFERENCES section (id) ON DELETE CASCADE,
    FOREIGN KEY (installation_id) REFERENCES installation (id) ON DELETE CASCADE
);

CREATE TABLE student_student_group (
    student_id INTEGER,
    student_group_id INTEGER,
    PRIMARY KEY (student_id, student_group_id),
    FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE,
    FOREIGN KEY (student_group_id) REFERENCES student_group (id) ON DELETE CASCADE
);

CREATE TABLE student_process (
    student_id INTEGER,
    process_id INTEGER,
    PRIMARY KEY (student_id, process_id),
    FOREIGN KEY (process_id) REFERENCES process (id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE
);

CREATE TABLE student_available_courses (
    student_id INTEGER,
    course_id INTEGER,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course (id) ON DELETE CASCADE
);

CREATE TABLE student_course (
    student_id INTEGER,
    course_id INTEGER,
    attempts SMALLINT NOT NULL,
    passed BOOLEAN NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course (id) ON DELETE CASCADE
);

CREATE TABLE section_speaker (
    section_id INTEGER,
    speaker_id INTEGER,
    FOREIGN KEY (section_id) REFERENCES section (id) ON DELETE CASCADE,
    FOREIGN KEY (speaker_id) REFERENCES speaker (id) ON DELETE CASCADE
);

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin

DROP TABLE IF EXISTS section_speaker;

DROP TABLE IF EXISTS course_prerequisite;

DROP TABLE IF EXISTS student_course;

DROP TABLE IF EXISTS student_available_courses;

DROP TABLE IF EXISTS student_process;

DROP TABLE IF EXISTS student_student_group;

DROP TABLE IF EXISTS event;

DROP TABLE IF EXISTS slots;

DROP TABLE IF EXISTS section;

-- +goose StatementEnd
