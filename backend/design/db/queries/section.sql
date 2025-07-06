-- name: CreateSection :exec
INSERT INTO section (
    name, course_id
) VALUES (
    $1, $2
);

-- name: UpdateSection :exec
UPDATE section
SET
    name = $1,
    course_id = $2
WHERE id = $3;

-- name: DeleteSection :exec
DELETE FROM section
WHERE id = $1;

-- name: ListSections :many
SELECT
    *
FROM section
ORDER BY course_id, name;

-- name: ListPopulateSections :many
SELECT
    s.id AS section_id,
    s.name AS section_name,
    c.id AS course_id,
    c.name AS course_name
FROM section s
JOIN course c ON s.course_id = c.id
ORDER BY c.id, s.name;

-- name: ListDetailedSectionByCourseId :many
SELECT
    s.id AS section_id,
    s.name AS section_name,
    sl.total_places,
    sl.taken_places,

    e.id AS event_id,
    e.start_date,
    e.end_date,

    i.id AS installation_id,
    i.name AS installation_name,

    m.id AS modality_id,
    m.name AS modality_name

FROM section s
JOIN slots sl ON sl.section_id = s.id
LEFT JOIN event e ON e.section_id = s.id
LEFT JOIN installation i ON i.id = e.installation_id
LEFT JOIN modality m ON m.id = e.modality_id
JOIN student_available_courses sac ON sac.course_id = s.course_id
WHERE s.course_id = $1 AND sac.student_id = $2
ORDER BY s.id, e.start_date;
