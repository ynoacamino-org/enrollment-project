-- name: CreateProcess :exec
INSERT INTO process (name, start_day, end_day, institution_id) VALUES ($1, $2, $3, $4);

-- name: ListAllProcess :many
SELECT *
FROM process
ORDER BY start_day;

-- name: DeleteProcess :exec
DELETE FROM process WHERE id = $1;

-- name: ListProcessByInstitutionId :many
SELECT p.*
FROM process AS p
JOIN student_process AS sp ON sp.process_id = p.id
JOIN student AS s ON sp.student_id = s.id
JOIN account AS a ON s.account_id = a.id
WHERE institution_id = $1 AND a.id = $2
ORDER BY start_day;

-- name: ListProcessByStudentId :many
SELECT p.*
FROM process AS p
JOIN student_process AS sp ON sp.process_id = p.id
JOIN student AS s ON sp.student_id = s.id
WHERE s.id = $1
ORDER BY start_day;

-- name: GetProcessById :one
SELECT *
FROM process
WHERE id = $1;
