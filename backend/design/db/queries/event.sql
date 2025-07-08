-- name: CreateEvent :exec
INSERT INTO event (
    start_date, end_date, section_id, installation_id, modality_id
) VALUES (
    $1, $2, $3, $4, $5
);

-- name: UpdateEvent :exec
UPDATE event
SET
    start_date = $1,
    end_date = $2,
    section_id = $3,
    installation_id = $4,
    modality_id = $5
WHERE id = $6;

-- name: DeleteEvent :exec
DELETE FROM event
WHERE id = $1;

-- name: ListEventsSection :many
SELECT
    e.id, e.start_date, e.end_date, e.section_id, e.installation_id, e.modality_id
FROM event e
JOIN section s ON e.section_id = s.id
WHERE s.id = $1
ORDER BY e.start_date;
