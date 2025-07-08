package types

import (
	. "goa.design/goa/v3/dsl"
)

var RedirectResult = Type("RedirectResult", func() {
	Description("Result type containing some URL to redirect the user")
	Attribute("Location", String, "Url fro redirecting", func() {
		Format(FormatURI)
		Example("https://example.com/some/path?query=param#fragment")
	})
	Required("Location")
})
