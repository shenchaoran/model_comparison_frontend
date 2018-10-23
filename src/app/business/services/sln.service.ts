import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@common/core/services/http.client';
import { ListBaseService } from './list-base.service';

@Injectable({
    providedIn: 'root'
})
export class SlnService extends ListBaseService {
    protected baseUrl = '/comparison/solutions';

    constructor(
        protected http: _HttpClient
    ) { 
        super(http);
    }

    public clear() {
        
    }
}
