package controllers

import (
	"context"

	queue "github.com/enrollment/gen/queue"
)

type queuesrvc struct{}

func NewQueue() queue.Service {
	return &queuesrvc{}
}

func (s *queuesrvc) Enqueue(context.Context) (err error) {
	return nil
}

func (s *queuesrvc) EnqueueSuscribe(context.Context, queue.EnqueueSuscribeServerStream) (err error) {
	return nil
}
