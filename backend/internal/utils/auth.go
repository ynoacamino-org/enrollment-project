package utils

import (
	"context"
	"errors"
)

func GetAccountFromContext(ctx context.Context) (string, error) {
	if ctx == nil {
		return "", errors.New("context is nil")
	}
	token := GetTokenFromContext(ctx)
	if token == "" {
		return "", errors.New("session token not found in context")
	}

	return token, nil
}
