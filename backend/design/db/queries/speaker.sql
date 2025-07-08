-- name: CreateSpeaker :exec
INSERT INTO speaker (
    account_id
) VALUES (
    $1
);

-- name: ListSpeakers :many
SELECT
    s.id,
    a.email,
    a.name,
    a.surname,
    a.avatar_url
FROM speaker s
JOIN account a ON s.account_id = a.id
ORDER BY a.name, a.surname
LIMIT $1
OFFSET $2;

-- name: FullListSpeakers :many
SELECT
    s.id,
    a.email,
    a.name,
    a.surname,
    a.avatar_url
FROM speaker s
JOIN account a ON s.account_id = a.id
ORDER BY a.name, a.surname;
