package api

import (
	"github.com/enrollment/design/api/types"
	. "goa.design/goa/v3/dsl"
)

var InstitutionResult = Type("Institution", func() {
	Description("Institution represents an educational institution")

	Attribute("id", Int32, "Unique identifier for the institution", func() {
		Example(1)
	})
	Attribute("name", String, "Name of the institution", func() {
		Example("University of Example")
	})
	Attribute("logoUrl", String, "URL to the institution's logo", func() {
		Format(FormatURI)
		Example("https://example.edu/logo.png")
	})

	Required("id", "name")
})

var ProcessResult = Type("Process", func() {
	Description("Process represents an enrollment process for an institution")

	Attribute("id", Int32, "Unique identifier for the process", func() {
		Example(1)
	})
	Attribute("name", String, "Name of the process", func() {
		Example("Fall Semester Enrollment")
	})
	Attribute("startDay", Int64, "Start date of the process in timestamp format", func() {
		Example(1700000000)
	})
	Attribute("endDay", Int64, "End date of the process in timestamp format", func() {
		Example(1700000000)
	})
	Attribute("institutionId", Int32, "ID of the institution this process belongs to", func() {
		Example(1)
	})
})

var ListProccesByInstitutionResult = Type("ListProccesByInstitutionResult", func() {
	Description("List of processes available for a specific institution")

	Extend(InstitutionResult)

	Attribute("processes", ArrayOf(ProcessResult), "List of processes for the institution")

	Required("processes")
})

var ListAllCoursesAvailableByStudentInProcessResult = Type("ListAllCoursesAvailableByStudentInProcessResult", func() {
	Description("List of courses available for a student in a specific process")

	Extend(ProcessResult)

	Attribute("courses", ArrayOf(types.Course), "List of courses available for the student in the process")

	Required("courses")
})

var SectionEnrollment = Type("SectionEnrollment", func() {
	Description("SectionEnrollment representa la inscripción de un estudiante en una sección de curso")

	Attribute("sectionId", Int32, "ID de la sección en la que el estudiante se está inscribiendo", func() {
		Example(1)
	})

	Required("sectionId")
})

var _ = Service("enrollment", func() {
	Description("The enrollment service provides endpoints for managing educational institutions and their processes.")

	Error("not_authorized", ErrorResult, "User is not authorized to access this resource")

	Error("internal_server_error", ErrorResult, "An internal server error occurred")

	Error("bad_request", ErrorResult, "The request was invalid or malformed")

	// Institutions service provides endpoints for managing educational institutions.
	Method("ListInstitutions", func() {
		Description("List all educational institutions avaliable for the user")

		Result(ArrayOf(InstitutionResult), "List of institutions available to the user")

		HTTP(func() {
			GET("/institutions")
			Response(StatusOK)
			Response("not_authorized", StatusForbidden)
		})
	})

	Method("ListProccesByInstitution", func() {
		Description("List all processes available for a specific institution")

		Payload(func() {
			Attribute("institutionId", Int32, "ID of the institution to list processes for", func() {
				Example(1)
			})
			Required("institutionId")
		})

		Result(ListProccesByInstitutionResult, "List of processes for the institution")

		HTTP(func() {
			GET("/institutions/{institutionId}")
			Param("institutionId", Int32, "ID of the institution")
			Response(StatusOK)
			Response("not_authorized", StatusForbidden)
			Response("internal_server_error", StatusInternalServerError)
		})
	})

	Method("ListAllCoursesAvailableByStudentInProcess", func() {
		Description("List all courses available for a student in a specific process")

		Payload(func() {
			Attribute("processId", Int32, "ID of the process to list courses for", func() {
				Example(1)
			})
			Required("processId")
		})

		Result(ListAllCoursesAvailableByStudentInProcessResult)

		HTTP(func() {
			GET("/processes/{processId}")
			Param("processId", Int32, "ID of the process")
			Response(StatusOK)
			Response("not_authorized", StatusForbidden)
			Response("internal_server_error", StatusInternalServerError)
		})

	})

	Method("ExpandCourse", func() {
		Description("Expand a course to get detailed information about their events and sections")

		Payload(func() {
			Attribute("courseId", Int32, "ID of the course to expand", func() {
				Example(1)
			})
			Required("courseId")
		})

		Result(ArrayOf(types.SectionWithEvents))

		HTTP(func() {
			GET("/courses/{courseId}/sections")
			Param("courseId", Int32, "ID of the course")
			Response(StatusOK)
			Response("not_authorized", StatusForbidden)
			Response("internal_server_error", StatusInternalServerError)
		})
	})

	Method("EnrollmentInCourses", func() {
		Description("Enroll a student in one or more sections of courses")

		Payload(ArrayOf(SectionEnrollment))

		// responder como ok
		Result(func() {
			Description("Enrollment successful")
			Attribute("message", String, "Success message", func() {
				Example("Enrollment successful")
			})
			Required("message")
		})

		HTTP(func() {
			POST("/courses/enrollment")
			Response(StatusOK)
			Response("not_authorized", StatusForbidden)
			Response("bad_request", StatusBadRequest)
			Response("internal_server_error", StatusInternalServerError)
		})
	})

	Method("GetEnrollmentInCourses", func() {
		Description("Get the enrollment status of a student in courses")

		Result(ArrayOf(types.EnrollmentInCoursesResult))

		HTTP(func() {
			GET("/courses/enrollmented")
			Response(StatusOK)
			Response("not_authorized", StatusForbidden)
			Response("bad_request", StatusBadRequest)
			Response("internal_server_error", StatusInternalServerError)
		})
	})
})
