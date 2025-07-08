package types

import (
	. "goa.design/goa/v3/dsl"
)

var ApiErrorType = Type("ApiError", func () {
	ErrorName("name", String, "Name of error")
	Attribute("message", String, "Message of error")
	Attribute("status", Int, "HTTP status code of error", func() {
		Example(400)
	})
	Attribute("details", String, "Additional details about the error", func() {
		Example("Invalid input data")
	})
	Required("name", "message", "status")
})
