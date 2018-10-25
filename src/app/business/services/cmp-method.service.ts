import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@common/core/services/http.client';
import { ListBaseService } from './list-base.service';

@Injectable({
    providedIn: 'root'
})
export class CmpMethodService extends ListBaseService {
    protected baseUrl = '/comparison/methods';

    public methods: any[];
    public methodCount: number;
    public method: any;

    constructor(
        protected http: _HttpClient
    ) {
        super(http);
    }

    findAllMatched(query) {
        return this.http.get(`${this.baseUrl}/matched`, {
            params: query
        })
    }

    findAll(where) {
        return this.http.get(`${this.baseUrl}`).pipe(map(res => {
            if(!res.error) {
                this.methods = res.data.docs;
                this.methodCount = res.data.count;
            }
            return res;
        }))
    }
}
