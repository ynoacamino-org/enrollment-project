package api

import (
	. "goa.design/goa/v3/dsl"
)

var AccountUser = Type("AccountUser", func() {
	Description("AccountUser type")

	Attribute("id", Int, "Unique user ID")
	Attribute("email", String, "User email")
	Attribute("name", String, "User first name")
	Attribute("surname", String, "User last names")
	Attribute("avatar_url", String, "User remaining names")

	Required("id", "email", "name", "surname", "avatar_url")
})

// List of majors available for the user grouped by role
var RoleMajors = Type("RoleMajors", func() {
	Description("Majors available for the user based on their roles")

	Attribute("student_majors", ArrayOf(String), "Majors in which the user is enrolled as a student", func() {
		Example([]string{"Computer Science", "Mathematics"})
	})

	Attribute("speaker_majors", ArrayOf(String), "Majors where the user teaches", func() {
		Example([]string{"Physics"})
	})

	Attribute("admin_majors", ArrayOf(String), "Majors the user manages administratively", func() {
		Example([]string{}) // could be empty if user isn't admin
	})

	Required("student_majors", "speaker_majors", "admin_majors")
})

var _ = Service("user", func() {
	Description("User management service")

	Method("get_all_majors", func() {
		Description("Get all majors available for the user")

		Result(RoleMajors)

		Error("server_error", ErrorResult, "Internal server error")
		Error("unauthorized", ErrorResult, "Unauthorized access")

		HTTP(func() {
			GET("/user/majors")
			Response(StatusOK)
			Response("server_error", StatusInternalServerError)
			Response("unauthorized", StatusUnauthorized)
		})
	})
})
