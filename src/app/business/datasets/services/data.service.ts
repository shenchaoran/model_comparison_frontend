import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';

@Injectable()
export class DataService {
    constructor(
        private http: _HttpClient
    ) {}

    findAll(query?): Observable<any> {
        return this.http.get('/std-data', {
            params: query
        });
    }

    findOne(id): Observable<any> {
        return this.http.get(`/std-data/${id}`);
    }

    preview(id, query): Observable<any> {
        return this.http.get(`/std-data/${id}/preview`, {
            params: query
        });
    }

    download(id, query): Observable<any> {
        return this.http.get(`/std-data/${id}/download`, {
            params: query
        })
    }
}
