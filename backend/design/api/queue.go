package api

import (
	. "goa.design/goa/v3/dsl"
)

var _ = Service("queue", func() {
	Description("Manage the queue of courses and enrollments")

	Error("not_found", ErrorResult, "The resource was not found")
	Error("bad_request", ErrorResult, "Invalid request")
	Error("un_authorized", ErrorResult, "Unauthorized access")

	Method("enqueue", func() {
		Description("Enqueue a student to the queue")

		Result(Empty)

		HTTP(func() {
			POST("/queue/enqueue")
			Response(StatusCreated)
			Response("bad_request", StatusBadRequest)
			Response("un_authorized", StatusUnauthorized)
		})
	})

	Method("enqueue_suscribe", func() {
		Description("Suscribe a student to queue in real time")

		StreamingResult(func() {
			Field(1, "position", Int32, "Position in the queue")
			Field(2, "status", String, "Status of the queue")
			Field(3, "total", Int32, "Total number of students in the queue")
		})

		HTTP(func() {
			GET("/queue/enqueue_suscribe")
			Response(StatusOK)
			Response("bad_request", StatusBadRequest)
			Response("un_authorized", StatusUnauthorized)
		})
	})
})
