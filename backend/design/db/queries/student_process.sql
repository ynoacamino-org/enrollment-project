-- name: CreateStudentProcess :exec
INSERT INTO student_process (
    student_id, process_id
) VALUES (
    $1, $2
);

-- name: DeleteStudentProcess :exec
DELETE FROM student_process
WHERE student_id = $1 AND process_id = $2;

-- name: ListStudentProcess :many
SELECT
    sp.student_id,
    sp.process_id,
    p.name AS process_name
FROM student_process sp
JOIN process p ON sp.process_id = p.id
WHERE sp.student_id = $1
ORDER BY p.name;

-- name: ListStudentByProcess :many
SELECT
    sp.student_id,
    sp.process_id,
    s.code AS student_code
FROM student_process sp
JOIN student s ON sp.student_id = s.id
WHERE sp.process_id = $1
ORDER BY s.code;

-- name: ListProcessByStudent :many
SELECT
    p.id AS process_id,
    p.name AS process_name
FROM student_process sp
JOIN process p ON p.id = sp.process_id
WHERE sp.student_id = $1
ORDER BY p.name;
