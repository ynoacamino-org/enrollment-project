CREATE TABLE slots (
    id SERIAL PRIMARY KEY,
    total_places INTEGER,
    taken_places INTEGER,
    section_id INTEGER NOT NULL,
    FOREIGN KEY (section_id) REFERENCES section (id) ON DELETE CASCADE
);

-- name: CreateSlot :exec
INSERT INTO slots (
    total_places, taken_places, section_id
) VALUES (
    $1, $2, $3
);

-- name: UpdateSlot :exec
UPDATE slots
SET
    total_places = $1,
    taken_places = $2,
    section_id = $3
WHERE id = $4;

-- name: UpdateTakenPlacesSlot :one
UPDATE slots
SET
    taken_places = $1
WHERE id = $2
RETURNING *;

-- name: DeleteSlot :exec
DELETE FROM slots
WHERE id = $1;
