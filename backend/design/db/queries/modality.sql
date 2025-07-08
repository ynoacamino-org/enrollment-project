
CREATE TABLE modality (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) UNIQUE NOT NULL
);

-- name: CreateModality :exec
INSERT INTO modality (name)
VALUES ($1);

-- name: UpdateModality :exec
UPDATE modality
SET
    name = $1
WHERE id = $2;

-- name: DeleteModality :exec
DELETE FROM modality
WHERE id = $1;

-- name: ListModalities :many
SELECT
    id,
    name
FROM modality
ORDER BY name;
