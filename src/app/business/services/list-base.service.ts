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

    insert(doc: any): Observable<any> {
        return this.http.post(`${this.baseUrl}`, {doc: doc});
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
        })
            .pipe(
                map(res => {
                    if(res.error) {
                        
                    }
                    else {
                        return res.data;
                    }
                })
            )
    }
}
