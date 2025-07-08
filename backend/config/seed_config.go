package config

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv/autoload"
)

type SeedConfig struct {
	DatabaseURL string
	Ctx         context.Context
}

func NewSeedConfig() (*SeedConfig, error) {
	devMode := flag.Bool("development", false, "Usar configuración de desarrollo")
	flag.Parse()

	envFile := ".env"
	if *devMode {
		log.Printf("Development mode: %t\n", *devMode)
		envFile = ".env.dev"
	}

	err := godotenv.Load(envFile)
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	databaseURL := os.Getenv(DATABASE_URL)
	if databaseURL == "" {
		return nil, fmt.Errorf("environment variable %s not found", DATABASE_URL)
	}

	ctx := context.Background()

	return &SeedConfig{
		DatabaseURL: databaseURL,
		Ctx:         ctx,
	}, nil
}

func (c *SeedConfig) GetConnectDBConfig() (string, context.Context) {
	return c.DatabaseURL, c.Ctx
}
