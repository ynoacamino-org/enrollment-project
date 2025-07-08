-- name: CreateInstalation :exec
INSERT INTO installation (name, description)
VALUES ($1, $2);

-- name: UpdateInstallation :exec
UPDATE installation
SET
    name = $1,
    description = $2
WHERE id = $3;

-- name: DeleteInstallation :exec
DELETE FROM installation
WHERE id = $1;

-- name: ListInstallations :many
SELECT
    id,
    name,
    description
FROM installation
ORDER BY name;
