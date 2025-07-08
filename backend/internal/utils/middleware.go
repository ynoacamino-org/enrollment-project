package utils

import (
	"context"
	"net/http"
)

type contextKey string

const SESSION_TOKEN_ID contextKey = "session_token"

func SessionTokenMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("session_token")
		value := ""
		if !(err != nil || cookie == nil) {
			value = cookie.Value
		}
		ctx := r.Context()
		ctx = context.WithValue(ctx, SESSION_TOKEN_ID, value)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func GetTokenFromContext(ctx context.Context) string {
	if ctx == nil {
		return ""
	}
	if value, ok := ctx.Value(SESSION_TOKEN_ID).(string); ok {
		return value
	}
	return ""
}
