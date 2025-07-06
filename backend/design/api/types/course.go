package types

import (
	. "goa.design/goa/v3/dsl"
)

var CoursePayload = Type("CoursePayload", func() {
	Description("Payload for uploading a single course")

	Attribute("name", String, func() {
		Description("Name of the course")
		Example("Introduction to Programming")
		MinLength(1)
		MaxLength(128)
	})

	Attribute("credits", Int, func() {
		Description("Number of credits for the course")
		Example(3)
		Minimum(1)
	})

	Attribute("cicle_number", Int, func() {
		Description("Cicle number of the course")
		Example(1)
		Minimum(1)
	})

	Required("name", "credits", "cicle_number")
})

var Course = Type("Course", func() {
	Description("Course represents a course in the system")

	Extend(CoursePayload)

	Attribute("id", Int, func() {
		Description("Unique identifier for the course")
		Example(144)
	})

	Required("id")
})

var DetailedEvent = Type("DetailedEvent", func() {
	Description("Represents an event related to a course")

	Attribute("id", Int, func() {
		Description("Unique identifier for the event")
		Example(1)
	})

	Attribute("start_date", Int64, func() {
		Description("Start date and time of the event")
		Example(1724064000)

	})

	Attribute("end_date", Int64, func() {
		Description("End date and time of the event")
		Example(1724074800)
	})

	Attribute("section_id", Int, func() {
		Description("ID of the section associated with this event")
		Example(2)
	})

	Attribute("installation_id", Int, func() {
		Description("ID of the installation where the event takes place")
		Example(5)
	})

	Attribute("installation_name", String, func() {
		Description("Name of the installation where the event takes place")
		Example("Laboratorio de Cómputo 1")
	})

	Attribute("modality_id", Int, func() {
		Description("ID of the modality associated with the event")
		Example(1)
	})

	Attribute("modality_name", String, func() {
		Description("Name of the modality (e.g., Presencial, Virtual)")
		Example("Presencial")
	})

	Required("id", "start_date", "end_date", "section_id", "installation_id", "modality_id", "installation_name", "modality_name")
})

var SectionWithEvents = Type("SectionWithEvents", func() {
	Description("Section with associated events")

	Attribute("id", Int, func() {
		Description("Unique identifier for the section")
		Example(1)
	})

	Attribute("section_name", String, func() {
		Description("Name of the section")
		Example("Sección A")
	})

	Attribute("taken_places", Int, func() {
		Description("Number of places taken in the section")
		Example(25)
		Minimum(0)
	})

	Attribute("total_places", Int, func() {
		Description("Total number of places in the section")
		Example(30)
		Minimum(1)
	})

	Attribute("events", ArrayOf(DetailedEvent), func() {
		Description("List of events associated with this section")
	})

	Required("id", "section_name", "taken_places", "total_places", "events")
})
