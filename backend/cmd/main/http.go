package main

import (
	"context"
	"net/http"
	"sync"
	"time"

	"github.com/enrollment/gen/enrollment"
	enrollmentsrv "github.com/enrollment/gen/http/enrollment/server"
	oauthsvr "github.com/enrollment/gen/http/oauth/server"
	"github.com/enrollment/internal/utils"

	//"github.com/enrollment/internal/utils"

	// "github.com/enrollment/gen/course"
	// "github.com/enrollment/gen/enrollment"
	"github.com/enrollment/gen/oauth"

	"goa.design/clue/debug"
	"goa.design/clue/log"
	goahttp "goa.design/goa/v3/http"
)

func handleHTTPServer(
	ctx context.Context,
	port string,
	institutionEndpoints *enrollment.Endpoints,
	oauthEndpoints *oauth.Endpoints,
	// _ *queue.Endpoints,
	wg *sync.WaitGroup,
	errc chan error,
	dbg bool) {

	var (
		dec = goahttp.RequestDecoder
		enc = goahttp.ResponseEncoder
	)

	var mux goahttp.Muxer = goahttp.NewMuxer()

	//mux.

	if dbg {
		debug.MountPprofHandlers(debug.Adapt(mux))
		debug.MountDebugLogEnabler(debug.Adapt(mux))
	}

	var (
		enrollmentServer *enrollmentsrv.Server
		oauthServer      *oauthsvr.Server
		// queueServer      *queuesvr.Server
	)
	{
		eh := errorHandler(ctx)
		enrollmentServer = enrollmentsrv.New(institutionEndpoints, mux, dec, enc, eh, nil)
		oauthServer = oauthsvr.New(oauthEndpoints, mux, dec, enc, eh, nil)
		// queueServer = queuesvr.New(queueEndpoints, mux, dec, enc, eh, nil)
	}

	enrollmentsrv.Mount(mux, enrollmentServer)
	oauthsvr.Mount(mux, oauthServer)

	var handler http.Handler = mux
	if dbg {
		handler = debug.HTTP()(handler)
	}
	handler = log.HTTP(ctx)(handler)
	handler = utils.SessionTokenMiddleware(handler)

	srv := &http.Server{Addr: ":" + port, Handler: handler, ReadHeaderTimeout: time.Second * 60}

	for _, m := range enrollmentServer.Mounts {
		log.Printf(ctx, "HTTP %q mounted on %s %s", m.Method, m.Verb, m.Pattern)
	}
	for _, m := range oauthServer.Mounts {
		log.Printf(ctx, "HTTP %q mounted on %s %s", m.Method, m.Verb, m.Pattern)
	}

	(*wg).Add(1)
	go func() {
		defer (*wg).Done()

		go func() {
			log.Printf(ctx, "HTTP server listening on port %q", port)
			errc <- srv.ListenAndServe()
		}()

		<-ctx.Done()
		log.Printf(ctx, "shutting down HTTP server at port %q", port)

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		err := srv.Shutdown(ctx)
		if err != nil {
			log.Printf(ctx, "failed to shutdown: %v", err)
		}
	}()
}

func errorHandler(logCtx context.Context) func(context.Context, http.ResponseWriter, error) {
	return func(ctx context.Context, w http.ResponseWriter, err error) {
		log.Printf(logCtx, "ERROR: %s", err.Error())
	}
}
