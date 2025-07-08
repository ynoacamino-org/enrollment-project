-- name: CreateStudentGroup :exec
INSERT INTO student_group (
  name, priority, start_day, end_day, process_id
) VALUES (
  $1, $2, $3, $4, $5
);

-- name: UpdateStudentGroup :exec
UPDATE student_group
SET
  name = $1,
  priority = $2,
  start_day = $3,
  end_day = $4
WHERE id = $5;

-- name: DeleteStudentGroup :exec
DELETE FROM student_group
WHERE id = $1;

-- name: ListStudentGroups :many
SELECT
  id,
  name,
  priority,
  start_day,
  end_day,
  process_id
FROM student_group
ORDER BY priority, start_day;
