import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent,
    HttpHeaders,
    HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';





/**
 * 统一处理response
 */
@Injectable()
export class ResParserInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // region 跳过不需要登录认证的url
        const url = req.url;
        const skipUrls = [
            'config/',
            'assets/'
        ];
        let shouldSkiped = false;
        _.map(skipUrls, skipUrl => {
            if (!shouldSkiped) {
                if (url.indexOf(skipUrl) !== -1) {
                    shouldSkiped = true;
                }
            }
        });
        if (shouldSkiped) {
            return next.handle(req).pipe(
                tap((event: any) => {
                    return Observable.create(observer => observer.next(event));
                })
            );
        }
        // endregion

        return next
            .handle(req)
            // .do((event: any) => {
            //     if (event instanceof HttpResponse) {
            //         // my wrapped http standard resource
            //         if (_.has(event.body, 'app')) {
            //             if (_.startsWith(_.get(event.body, 'status.code'), '200')) {
            //                 // console.log('interceptor 2');
            //                 // success
            //                 // TODO
            //                 const parsed = event.clone({
            //                     body: {
            //                         succeed: true,
            //                         data: event.body.data
            //                     }
            //                 });
            //                 // console.log(parsed);
            //                 return Observable.create(observer =>
            //                     observer.next(parsed)
            //                 );
            //             } else {
            //                 // failed
            //                 const parsed = event.clone({
            //                     body: {
            //                         succeed: false
            //                     }
            //                 });
            //                 return Observable.create(observer =>
            //                     observer.error(parsed)
            //                 );
            //             }
            //         } else {
            //             // download resource
            //             return Observable.create(observer => observer.next(event));
            //         }
            //     }
            // })
            // .catch((res: HttpResponse<any>) => {
            //     switch (res.status) {
            //         case 401:
            //             // please login first
            //             break;
            //         case 200:
            //             console.log('业务错误');
            //             break;
            //         case 404:
            //             break;
            //     }
            //     return Observable.throw(res);
            // });
    }
}
