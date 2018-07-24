import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from '@shared';

@Injectable()
export class CmpTaskService extends ListBaseService {
    protected baseUrl = 'comparison/tasks';

    constructor(
        protected http: _HttpClient
    ) { 
        super(http);
    }

    invoke(id: string): Observable<any> {
        if (id) {
            return this.http.post(`/${this.baseUrl}/${id}/invoke`, undefined);
        } else {
            return undefined;
        }
    }
}
