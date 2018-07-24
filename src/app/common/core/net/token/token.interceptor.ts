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
 * TOKEN拦截器，其注册细节见 `core.module`
 * 拦截器执行顺序和注册顺序相反
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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

        const jwtStr = localStorage.getItem('jwt');
        if (jwtStr !== undefined) {
            const jwt = JSON.parse(jwtStr);
            if (jwt !== null && jwt.expires > Date.now()) {
                // token is available
                const token = jwt.token;
                const customReq = req.clone({
                    headers: req.headers.set('Authorization', `bearer ${token}`)
                });
                return next
                    .handle(customReq)
                    // .do((event: any) => {
                    //     if (event instanceof HttpResponse) {
                    //         // my wrapped http standard resource
                    //         if (_.has(event.body, 'app')) {
                    //             if (_.startsWith(_.get(event.body, 'status.code'), '200')) {
                    //                 // console.log('interceptor 1');
                    //                 // success
                    //                 return Observable.create(observer =>
                    //                     observer.next(event)
                    //                 );
                    //             } else {
                    //                 // failed
                    //                 return Observable.create(observer =>
                    //                     observer.error(event)
                    //                 );
                    //             }
                    //         } else {
                    //             // download resource
                    //             return Observable.create(observer =>
                    //                 observer.next(event)
                    //             );
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
            } else {
                // token has experied
                return next.handle(req).pipe(
                    tap((event: any) => {
                        this.redirect2Login();
                        return Observable.create(observer =>
                            observer.error({ status: 401 })
                        );
                    })
                );
            }
        }
    }

    redirect2Login() {
        const router = this.injector.get(Router);
        this.injector.get(Router).navigate(['/login']);
    }
}
