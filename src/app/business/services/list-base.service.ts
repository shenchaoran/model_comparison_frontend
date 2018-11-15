import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@core/services/http.client';

@Injectable({
    providedIn: 'root'
})
export class ListBaseService {
    protected baseUrl: string;

    constructor(
        protected http: _HttpClient
    ) { }

    getDetailPage(id, type: 'ARTICLE' | 'SIDER', mode: 'READ' | 'WRITE') {
        return this.http.get(`${this.baseUrl}/${id}`, {
            params: { type, mode }
        })
    }

    findAll(query?: any): Observable<any> {
        return this.http.get(`${this.baseUrl}`, {
            params: query
        });
    }

    findByIds(ids: string[]): Observable<any> {
        return this.http.get(`${this.baseUrl}`, {
            params: {
                ids: ids
            }
        });
    }

    findOne(id, withRequestProgress?): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`, undefined, undefined, undefined, withRequestProgress);
    }

    findOneByWhere(where): Observable<any> {
        return this.http.get(`${this.baseUrl}`, {
            params: where
        });
    }

    getTopK(k) {
        return this.http.get(`${this.baseUrl}`, {
            params: {
                pageSize: k,
                pageIndex: 1
            }
        });
    }

    insert(body): Observable<any> {
        return this.http.post(`${this.baseUrl}`, body);
    }

    delete(id) {
        return this.http.delete(`${this.baseUrl}/${id}`)
    }

    patch(id, body) {
        return this.http.patch(`${this.baseUrl}/${id}`, body);
    }
}
