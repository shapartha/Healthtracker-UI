import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';


@Injectable()
export class AppInterceptor implements HttpInterceptor {
    private cache = new Map<string, any>();

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        let ok: string;
/**
 * All commented code here is to implement caching when GET method is there
 */
        const cachedResponse = this.cache.get(httpRequest.url);
        if (cachedResponse && httpRequest.method == "GET") {
            return of(cachedResponse);
        }

        return next.handle(httpRequest).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    ok = event instanceof HttpResponse ? 'succeeded' : '';
                    if (event instanceof HttpResponse && httpRequest.method == "GET") {
                        this.cache.set(httpRequest.url, event);
                    }
                }, (error: HttpErrorResponse) => ok = "failed"
            ), finalize(() => {
                const elapsed = Date.now() - started;
                const msg = `${httpRequest.method} "${httpRequest.urlWithParams}" ${ok} in ${elapsed} ms.`;
                console.log(msg);
            })
        );
    }
}