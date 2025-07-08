package api

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	. "goa.design/goa/v3/dsl"
	cors "goa.design/plugins/v3/cors/dsl"
)
var frontendURL string
func init() {
	envFile := ".env"
	fmt.Println("[init] Loading environment variables from", envFile)
	err := godotenv.Load(envFile)
	if err != nil {
		fmt.Println("[init] Error loading .env file:", err)
	} else {
		fmt.Println("[init] .env file loaded successfully")
	}
	frontendURL = os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		fmt.Println("[init] FRONTEND_URL not set, using default http://localhost:4321")
		frontendURL = "http://localhost:4321"
	} else {
		fmt.Println("[init] FRONTEND_URL loaded from environment:", frontendURL)
	}
}
var _ = API("Tuitions", func() {
    Title("Api for Tuitions application")
    Description("This API provides endpoints for managing courses, enrollments, and OAuth authentication for the Tuitions application.")
    cors.Origin(frontendURL, func() {
        cors.Headers("Content-Type")
        cors.Methods("GET", "POST", "PUT", "DELETE")
        cors.MaxAge(600)
        cors.Expose("Set-Cookie")
        cors.Credentials()
    })
})
