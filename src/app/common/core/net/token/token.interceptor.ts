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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/**
 * TOKEN拦截器，其注册细节见 `webNJGIS.module`
 * 因为app.module引用了core.module,所以app.module不用注册
 * 相反的，webNJGIS.module没有引用，所以要注册
 * 只有注册了的module才会被拦截器拦截
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // region 跳过不需要登录认证的url
        const url = req.url;
        const skipUrls = [
            'login',
            'register',
            'find-psw',
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
            return next.handle(req).do((event: any) => {
                return Observable.create(observer => observer.next(event));
            });
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
                    .do((event: any) => {
                        if (event instanceof HttpResponse) {
                            // my wrapped http standard resource
                            if (_.has(event.body, 'app')) {
                                if (
                                    !_.startsWith(
                                        _.get(event.body, 'status.code'),
                                        '200'
                                    )
                                ) {
                                    // success
                                    return Observable.create(observer =>
                                        observer.next(event)
                                    );
                                } else {
                                    // failed
                                    return Observable.create(observer =>
                                        observer.error(event)
                                    );
                                }
                            } else {
                                // download resource
                                return Observable.create(observer =>
                                    observer.next(event)
                                );
                            }
                        }
                    })
                    .catch((res: HttpResponse<any>) => {
                        switch (res.status) {
                            case 401:
                                // please login first
                                break;
                            case 200:
                                console.log('业务错误');
                                break;
                            case 404:
                                break;
                        }
                        return Observable.throw(res);
                    });
            } else {
                // token has experied
                return next.handle(req).do((event: any) => {
                    this.redirect2Login();
                    return Observable.create(observer =>
                        observer.error({ status: 401 })
                    );
                });
            }
        }
    }

    redirect2Login() {
        const router = this.injector.get(Router);
        this.injector.get(Router).navigate(['/login']);
    }
}
