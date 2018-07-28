import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from '@shared';

@Injectable()
export class StdDataService extends ListBaseService {
    baseUrl = 'std-data'

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
}
