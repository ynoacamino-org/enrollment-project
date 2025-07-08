-- name: GetAccountByEmail :one
SELECT * FROM account
WHERE email = $1;

-- name: FullListAccounts :many
SELECT * FROM account
ORDER BY id;

-- name: ListAccounts :many
SELECT * FROM account
ORDER BY id
LIMIT $1 OFFSET $2;

-- name: GetAccountByAccessToken :one
SELECT * FROM account
WHERE access_token = $1;

-- name: GetSessionByToken :one
SELECT * FROM account_session
WHERE token = $1;

-- name: GetAccountById :one
SELECT * FROM account
WHERE id = $1;


-- name: CreateAccount :exec
INSERT INTO account (
    email,
    name,
    surname,
    avatar_url,
    oauth_provider_id,
    access_token,
    refresh_token
) VALUES (
    $1, $2, $3, $4, $5, $6, $7
);

-- name: CreateAccountWithProviderName :exec
INSERT INTO account (
    email,
    name,
    surname,
    avatar_url,
    oauth_provider_id,
    access_token,
    refresh_token
) VALUES (
    @email::text,
    @name::text,
    @surname::text,
    @avatar_url::text,
    (SELECT op.id FROM oauth_provider op WHERE op.name = @provider_name::text),
    @access_token::text,
    @refresh_token::text
);



-- name: CreateAccountSession :one
INSERT INTO account_session (
    token,
    expiration_date,
    user_agent,
    ip_address,
    account_id
) VALUES (
    $1, $2, $3, $4, $5
)
RETURNING id, token, expiration_date, user_agent, ip_address, account_id;



-- name: CreateOauthProvider :exec
INSERT INTO oauth_provider (name) VALUES ($1);


-- name: DeleteAccountByToken :exec
DELETE FROM account_session
WHERE token = $1;
