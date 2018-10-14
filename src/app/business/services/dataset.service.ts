import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@common/core/services/http.client';
import { ListBaseService } from './list-base.service';

@Injectable({
    providedIn: 'root'
})
export class DatasetService extends ListBaseService {
    protected baseUrl = 'std-data';
    constructor(
        protected http: _HttpClient
    ) {
        super(http);
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

    fetchDbEntries(ids): Observable<any> {
        return this.http.get(`/std-data/docs`, {
            params: {
                ids: ids
            }
        })
    }

    // preview(id, query): Observable<any> {
    //     return this.http.get(`/std-data/${id}/preview`, {
    //         params: query
    //     });
    // }

    // download(id, query): Observable<any> {
    //     return this.http.get(`/std-data/${id}/download`, {
    //         params: query
    //     })
    // }
}
