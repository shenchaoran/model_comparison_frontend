import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataInquireService } from '@core/services/data.inquire.service';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';

@Injectable()
export class CmpTaskService implements Resolve<any> {
    constructor(
        private http: _HttpClient,
        private dataInquire: DataInquireService
    ) {}

    resolve() {
        return this.getDataTabTree()
            .toPromise()
            .then(response => {
                if(response.error) {
                    return Promise.reject(response.error);
                }
                else {
                    return Promise.resolve(response.data)
                }
            });
    }

    getDataTabTree(): Observable<any> {
        return this.dataInquire.get('/comparison/tasks');
    }
}
