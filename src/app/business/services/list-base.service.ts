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

    findAll(query?: any): Observable<any> {
        return this.http.get(`${this.baseUrl}`, {
            params: query
        });
    }

    findOne(id, withRequestProgress?): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`, undefined, undefined, undefined, withRequestProgress);
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
