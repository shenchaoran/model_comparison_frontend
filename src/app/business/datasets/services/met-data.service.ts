import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';

@Injectable()
export class MetDataService {

    constructor(
        private http: _HttpClient
    ) { }

    getSites() {
        return this.http.get(`/std-data/met_site`, {
            responseType: 'text'
        }, true, false);
    }

    getSTD_DATA(className, eventId, query) {
        return this.http.get(`/std-data/${className}?eventId=${eventId}&query=${query}`, {
            responseType: 'text'
        }, true, false);
    }
}
