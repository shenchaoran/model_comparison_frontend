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

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        console.log('token interceptor');
        // return next.handle(req);
        // process response...
        const customReq = req.clone({
            headers: req.headers.set('token', 'i am a token')
        })

        return next
            .handle(customReq)
            .do((event: any) => {
                // process response...
                if (event instanceof HttpResponse) {
                    // my wrapped http standard resource
                    if(_.has(event.body, 'status')) {
                        if(!_.startsWith(_.get(event.body, 'status.code'), '200')) {
                            // success
                            return Observable.create(observer => observer.next(event));
                        }
                        else {
                            // failed
                            return Observable.create(observer => observer.error(event));
                        }
                    }
                    else {
                        // static resource
                        return Observable.create(observer => observer.next(event));
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
    }
}
