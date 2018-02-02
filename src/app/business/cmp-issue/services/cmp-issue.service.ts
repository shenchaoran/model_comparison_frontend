import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';

@Injectable()
export class CmpIssueService implements Resolve<any> {
    
    constructor(private http: _HttpClient) {}

    resolve(): Promise<any> {
        return this.findAll()
            .toPromise()
            .then(response => {
                if(response.error) {
                    return Promise.reject(response.error);
                }
                else {
                    return Promise.resolve(response.data.docs);
                }
            })
            .catch(Promise.reject)
    }

    findAll(): Observable<any> {
        return this.http.get('/comparison/issues');
    }

    findOne(id): Observable<any> {
        return this.http.get(`/comparison/issues/${id}`);
    }
}