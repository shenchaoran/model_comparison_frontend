import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataInquireService } from '@core/services/data.inquire.service';
import { Resolve } from '@angular/router';

@Injectable()
export class DataService implements Resolve<any> {
    constructor(
        private http: HttpClient,
        private dataInquire: DataInquireService
    ) {}

    resolve() {
        return this.getDataTree()
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

    getDataTree(): Observable<any> {
        return this.dataInquire.get('getDataTree');
    }
}
