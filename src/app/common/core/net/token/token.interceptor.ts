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
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

/**
 * TOKEN拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // return next.handle(req);

        return next
            .handle(req)
            .mergeMap((event: any) => {
                // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
                if (
                    event instanceof HttpResponse &&
                    _.has(event.body, 'status') &&
                    !_.startsWith(_.get(event.body, 'status.code'), '200')
                ) {
                    // observer.error 会跳转至后面的 `catch`
                    return Observable.create(observer => observer.error(event));
                }

                // 若一切都正常，则后续操作
                return Observable.create(observer => observer.next(event));
            })
            .catch((res: HttpResponse<any>) => {
                // 一些通用操作
                switch (res.status) {
                    case 401:
                        // 未登录状态码
                        break;
                    case 200:
                        console.log('业务错误');
                        break;
                    case 404:
                        break;
                }
                // 以错误的形式结束本次请求
                return Observable.throw(res);
            });
    }
}
