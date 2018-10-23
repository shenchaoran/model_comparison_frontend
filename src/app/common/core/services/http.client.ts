// tslint:disable:no-console class-name
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NzNotificationService } from 'ng-zorro-antd';

/**
 * 封装HttpClient，主要解决：
 *      append JWT force
 *      response interceptor
 */

@Injectable()
export class _HttpClient {
    constructor(
        private http: HttpClient,
        @Inject('BACKEND') private backend,
        private loading: SlimLoadingBarService,
        //private _notice: NzNotificationService
    ) { }

    private appendDomain(url: string): string {
        return `http://${this.backend.host}:${this.backend.port}${this.backend.API_prefix}${url}`;
    }

    private appendJWT(url: string, appendJWT: boolean, withRequestProgress?: boolean): string {
        if (withRequestProgress !== false)
            this.loading.start();
        url = this.appendDomain(url);
        if (appendJWT !== false) {
            const jwtStr = localStorage.getItem('jwt');
            let jwt = undefined;
            if (jwtStr) {
                jwt = JSON.parse(jwtStr);
                if (url.indexOf('?') === -1) {
                    url += `?Authorization=bearer ${jwt.token}`;
                }
                else {
                    url += `&Authorization=bearer ${jwt.token}`;
                }
            }
            else {

            }
        }
        return url;
    }

    private resInterceptor(observable: Observable<any>, parseRes?: boolean, withRequestProgress?: boolean): Observable<any> {
        return Observable.create(observer => {
            observable
                .subscribe(response => {
                    if (withRequestProgress !== false)
                        this.loading.complete();
                    if (parseRes !== false) {
                        if (!response.error) {
                            observer.next({
                                data: response.data
                            });
                            observer.complete();
                        }
                        else {
                            observer.next({
                                error: response.error
                            });
                            console.log(response.error);
                            // this.notice.warning('Warning', 'Http request error!');
                            observer.complete();
                        }
                    }
                    else {
                        // TODO 因为 默认的 responseType 为json，所以parseRes为 false时，同时要设置options的 responseType
                        observer.next(response);
                        observer.complete();
                    }
                });
        });
    }

    get(
        url: string,
        options: any = {},
        appendJWT?: boolean,
        parseRes?: boolean,
        withRequestProgress?: boolean
    ): Observable<any> {
        url = this.appendJWT(url, appendJWT, withRequestProgress);
        return this.resInterceptor(this.http.get(url, options), parseRes, withRequestProgress);
    }

    post(
        url: string,
        body: any | null,
        options: any = {},
        appendJWT?: boolean,
        parseRes?: boolean,
        withRequestProgress?: boolean
    ): Observable<any> {
        url = this.appendJWT(url, appendJWT, withRequestProgress);
        return this.resInterceptor(this.http.post(url, body, options), parseRes, withRequestProgress);
    }

    delete(
        url: string,
        options: any = {},
        appendJWT?: boolean,
        parseRes?: boolean
    ): Observable<any> {
        url = this.appendJWT(url, appendJWT);
        return this.resInterceptor(this.http.delete(url, options), parseRes);
    }

    put(
        url: string,
        body: any | null,
        options: any = {},
        appendJWT?: boolean,
        parseRes?: boolean
    ): Observable<any> {
        url = this.appendJWT(url, appendJWT);
        return this.resInterceptor(this.http.put(url, body, options), parseRes);
    }

    patch(
        url: string,
        body: any | null,
        options: any = {},
        appendJWT?: boolean,
        parseRes?: boolean
    ): Observable<any> {
        url = this.appendJWT(url, appendJWT);
        return this.resInterceptor(this.http.patch(url, body, options), parseRes);
    }
}
