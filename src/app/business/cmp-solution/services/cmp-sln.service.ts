import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';

@Injectable()
export class CmpSlnService implements Resolve<any> {
    constructor(
        private http: _HttpClient
    ) {}

    resolve() {
        return this.findAll({})
            .toPromise()
            .then(response => {
                if(response.error) {
                    return Promise.reject(response.error);
                }
                else {
                    return Promise.resolve(response.data);
                }
            });
    }

    findAll(query): Observable<any> {
        return this.http.get('/comparison/solutions', {
            params: query
        });
    }

    insertSln(sln: any): Observable<any> {
        return this.http.post('/comparison/solutions', {doc: sln});
    }

    findOne(id: string): Observable<any> {
        return this.http.get(`/comparison/solutions/${id}`);
    }
}
