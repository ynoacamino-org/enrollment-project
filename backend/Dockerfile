FROM docker.io/library/golang:latest AS builder

WORKDIR /app

RUN go install goa.design/goa/v3/cmd/goa@latest
RUN go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest

COPY ./go.mod /app/go.mod
COPY ./go.sum /app/go.sum

RUN go mod download

COPY . /app

RUN bash ./fast_gen.sh

RUN go build -o main /app/cmd/main/

FROM docker.io/library/debian:bookworm-slim  AS production

WORKDIR /app

COPY --from=builder /app/main /app/main

CMD ["/app/main"]
