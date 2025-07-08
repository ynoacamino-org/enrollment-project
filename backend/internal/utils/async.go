package utils

type Result[T any] struct {
	Value T
	Err   error
}

func Async[T any](fn func() (T, error)) <-chan Result[T] {
	ch := make(chan Result[T], 1)
	go func() {
		v, err := fn()
		ch <- Result[T]{Value: v, Err: err}
	}()
	return ch
}
