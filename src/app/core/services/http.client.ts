// tslint:disable:no-console class-name
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '@config';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

/**
 * 封装HttpClient，主要解决：
 *      append JWT force
 *      response interceptor
 */

@Injectable({
    providedIn: 'root'
})
export class _HttpClient {
    headers: HttpHeaders = new HttpHeaders();

    constructor(
        private http: HttpClient,
        private loading: SlimLoadingBarService,
        @Inject('API') public api,
    ) {
        this.setAuthHeaders();
    }

    setAuthHeaders() {
        const jwtStr = localStorage.getItem('jwt');
        if (jwtStr) {
            this.headers = new HttpHeaders().append('Authorization', `bearer ${JSON.parse(jwtStr).token}`);
        }
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
        this.headers = this.headers.delete('X-HTTP-Method-Override')
        return this.resInterceptor(this.http.get(url, {
            ...options, 
            headers: this.headers
        }), parseRes, withRequestProgress);
    }

    post(
        url: string,
        body: any | null,
        options: any = {},
        appendJWT?: boolean,
        parseRes?: boolean,
        withRequestProgress?: boolean
    ): Observable<any> {
        this.headers = this.headers.delete('X-HTTP-Method-Override')
        return this.resInterceptor(this.http.post(url, body, {
            ...options, 
            headers: this.headers
        }), parseRes, withRequestProgress);
    }

    delete(
        url: string,
        options: any = {},
        appendJWT?: boolean,
        parseRes?: boolean
    ): Observable<any> {
        this.headers = this.headers.append("X-HTTP-Method-Override", "delete");
        return this.resInterceptor(this.http.post(url, null, {
            ...options,
            headers: this.headers
        }), parseRes);
    }

    put(
        url: string,
        body: any | null,
        options: any = {},
        appendJWT?: boolean,
        parseRes?: boolean
    ): Observable<any> {
        this.headers = this.headers.append("X-HTTP-Method-Override", "put");
        return this.resInterceptor(this.http.post(url, body, {
            ...options,
            headers: this.headers
        }), parseRes);
    }

    patch(
        url: string,
        body: any | null,
        options: any = {},
        appendJWT?: boolean,
        parseRes?: boolean
    ): Observable<any> {
        this.headers = this.headers.append("X-HTTP-Method-Override", "patch");
        return this.resInterceptor(this.http.post(url, body, {
            ...options,
            headers: this.headers
        }), parseRes);
    }
}
