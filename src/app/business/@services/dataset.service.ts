import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from './list-base.service';

@Injectable({
    providedIn: 'root'
})
export class DatasetService extends ListBaseService {
    constructor(
        protected http: _HttpClient
    ) {
        super(http);
        this.baseUrl = `${this.http.api.backend}/std-data`;
    }

    preview(id, query): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}/preview`, {
            params: query
        });
    }

    download(id, query): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}/download`, {
            params: query
        })
    }

    // preview(id, query): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/${id}/preview`, {
    //         params: query
    //     });
    // }

    // download(id, query): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/${id}/download`, {
    //         params: query
    //     })
    // }
}
