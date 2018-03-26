import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';

@Injectable()
export class CalculationService {

    constructor(
        private http: _HttpClient
    ) { }

    findAll(query?): Observable<any> {
        return this.http.get('/calculation', {
            params: query
        });
    }

    findOne(id): Observable<any> {
        return this.http.get(`/calculation/${id}`);
    }
}
