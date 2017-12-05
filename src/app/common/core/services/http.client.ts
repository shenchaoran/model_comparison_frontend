// tslint:disable:no-console class-name
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * 封装HttpClient，主要解决：
 * + 可以判断loading状态
 * + 统一处理response
 */

@Injectable()
export class _HttpClient {
    constructor(private http: HttpClient) { }

    private _loading = false;

    /** 是否正在加载中 */
    get loading(): boolean {
        return this._loading;
    }

    parseParams(params: any): HttpParams {
        let ret = new HttpParams();
        if (params) {
            // tslint:disable-next-line:forin
            for (const key in params) {
                let _data = params[key];
                ret = ret.set(key, _data);
            }
        }
        return ret;
    }

    get(url: string, params?: any): Observable<any> {
        return this.http
            .get(url, {
                params: params
            })
            .catch((res) => {
                return res;
            });
    }

    post(url: string, body?: any, params?: any): Observable<any> {
        return this.http
            .post(url, body || null, {
                params: params
            })
            .catch((res) => {
                return res;
            });
    }

    delete(url: string, params?: any): Observable<any> {
        return this.http
            .delete(url, {
                params: params
            })
            .catch((res) => {
                return res;
            });
    }
}
