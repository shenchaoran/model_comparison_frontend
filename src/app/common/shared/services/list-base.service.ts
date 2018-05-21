import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';

@Injectable()
export class ListBaseService {
    protected baseUrl: string;

    constructor(
        protected http: _HttpClient
    ) { }

    findAll(query): Observable<any> {
        return this.http.get(`/${this.baseUrl}`, {
            params: query
        });
    }

    insert(doc: any): Observable<any> {
        return this.http.post(`/${this.baseUrl}`, {doc: doc});
    }

    findOne(id): Observable<any> {
        return this.http.get(`/${this.baseUrl}/${id}`);
    }
}