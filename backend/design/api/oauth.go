package api

import (
	"github.com/enrollment/design/api/types"
	. "goa.design/goa/v3/dsl"
)

var OAuthProviderType = Type("OAuthProvider", String, func() {
	Description("OAuth provider options")
	Enum("google", "microsoft") // Or use variables if preferred
	Example("google")
})

// Result type containing the URL to redirect the user to start OAuth login
var OAuthRedirectResult = Type("OAuthRedirectResult", func() {
	Description("Redirect URL for initiating OAuth login")
	Attribute("Location", String, "OAuth authorization URL", func() {
		Format(FormatURI)
		Example("https://accounts.google.com/o/oauth2/auth?...code")
	})
	Required("Location")
})

// Result type after successful OAuth login
var LoginResult = Type("LoginResult", func() {
	Description("Successful login result containing access token")
	Attribute("session_token", String, "Cookie for session management")
	Attribute("Location", String, "Redirect URL after login")
	Required("session_token")
})

var LogoutResult = Type("LogoutResult", func() {
	Description("Result after logout operation")
	Attribute("session_token", String, "Session token to invalidate")
	Required("session_token")
})

var _ = Service("oauth", func() {
	Description("OAuth-based authentication service for Google and Microsoft")

	// Initiates the login by generating a provider-specific OAuth authorization URL
	Method("login", func() {
		Description("Generate a redirection URL for the chosen OAuth provider")

		Payload(func() {
			Attribute("provider", OAuthProviderType, "OAuth provider name")
			Required("provider")
		})

		Result(OAuthRedirectResult)

		Error("invalid_provider", ErrorResult, "Unsupported OAuth provider")

		HTTP(func() {
			GET("/auth/{provider}/login")
			Response(StatusTemporaryRedirect, func() {
				Header("Location")
			})
		})
	})

	// OAuth callback handler, exchanges authorization code for access token, logs user in
	Method("callback", func() {
		Description("Handle OAuth callback and authenticate user")

		Payload(func() {
			Attribute("provider", OAuthProviderType, "OAuth provider name")
			Attribute("code", String, "Authorization code", func() {
				MinLength(1)
			})
			Attribute("state", String, "Anti-CSRF state token", func() {
				MinLength(10)
			})
			Attribute("ip_address", String, "IP address of the user")
			Attribute("user_agent", String, "User agent string of the client")
			Required("provider", "code", "state")
		})

		Result(LoginResult)

		Error("unauthorized", types.RedirectResult, "Redirect to login page if unauthorized")
		Error("invalid_token", ErrorResult, "Invalid or expired OAuth token")
		Error("server_error", ErrorResult, "Internal server error")

		HTTP(func() {
			GET("/auth/{provider}/callback")
			Param("code")
			Param("state")
			Header("user_agent:User-Agent", String, "User agent of the client")
			Header("ip_address:X-Forwarded-For", String, "IP address of the client")
			Response(StatusTemporaryRedirect, func() {
				// Cookie("session_token:session_token", String, func() {
				// 	Description("Session token set in cookie after successful login")
				// 	Example("session_token=abc123xyz")
				// })
				// CookieHTTPOnly()
				// 	CookieMaxAge(86400) // 1 day
				// CookieSameSite(CookieSameSiteLax)
				// CookiePath("/")
				Header("Location", String, "Redirect URL after successful login that contains the session token in a query parameter")

			})
			Response("invalid_token", StatusBadRequest)
			Response("server_error", StatusInternalServerError)
			Response("unauthorized", StatusTemporaryRedirect, func () {
				Header("Location", String, "Redirect URL to the login page if unauthorized")
			})
		})
	})

	// Logout endpoint to invalidate a session
	Method("logout", func() {
		Description("Terminate the current session and invalidate the token")

		Payload(func() {
			Attribute("session_token", String, "Session token to invalidate")
			Required("session_token")
		})

		Result(LogoutResult)

		Error("unauthorized", ErrorResult, "Missing or invalid token")

		HTTP(func() {
			POST("/auth/logout")
			Cookie("session_token:session_token", String, func() {
				Description("Session token to invalidate")
				Example("session_token=abc123xyz")
			})
			Response(StatusOK, func() {
				Cookie("session_token:session_token", String, func() {
					Description("Clears the session token cookie on logout")
					Example("session_token=; Max-Age=0; Path=/")
				})
				CookieMaxAge(0) // Clear the Cookie
				CookiePath("/")
			})
			Response("unauthorized", StatusUnauthorized)
		})
	})

	Method("me", func() {
		Description("Returns the authenticated user's information")

		Payload(func() {
			Attribute("session_token", String, "Session token to invalidate")
			Required("session_token")
		})

		Result(AccountUser)

		Error("unauthorized", ErrorResult, "Unauthorized access")

		HTTP(func() {
			GET("/auth/me")
			Cookie("session_token:session_token", String, func() {
				Description("Session token to invalidate")
				Example("session_token=abc123xyz")
			})
			Response(StatusOK)
			Response("unauthorized", StatusUnauthorized)
		})
	})
})
