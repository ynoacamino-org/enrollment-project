CREATE TABLE section_speaker (
    section_id INTEGER,
    speaker_id INTEGER,
    FOREIGN KEY (section_id) REFERENCES section (id) ON DELETE CASCADE,
    FOREIGN KEY (speaker_id) REFERENCES speaker (id) ON DELETE CASCADE
);

-- name: CreateSectionSpeaker :exec
INSERT INTO section_speaker (
    section_id, speaker_id
) VALUES (
    $1, $2
);

-- name: DeleteSectionSpeaker :exec
DELETE FROM section_speaker
WHERE section_id = $1 AND speaker_id = $2;

-- name: ListSectionSpeakers :many
SELECT
    ss.section_id,
    ss.speaker_id,
    a.name AS speaker_name
FROM section_speaker ss
JOIN speaker s ON ss.speaker_id = s.id
JOIN account a ON s.account_id = a.id
WHERE ss.section_id = $1
ORDER BY a.name;

-- name: ListSectionSpeakersByCourse :many
SELECT
    ss.section_id,
    ss.speaker_id,
    a.name AS speaker_name
FROM section_speaker ss
JOIN section sec ON ss.section_id = sec.id
JOIN speaker s ON ss.speaker_id = s.id
JOIN account a ON s.account_id = a.id
WHERE sec.course_id = $1
ORDER BY ss.section_id, a.name;

-- name: ListSectionSpeakersBySpeaker :many
SELECT
    ss.section_id,
    ss.speaker_id,
    a.name AS speaker_name
FROM section_speaker ss
JOIN speaker s ON ss.speaker_id = s.id
JOIN account a ON s.account_id = a.id
WHERE ss.speaker_id = $1
ORDER BY ss.section_id;
