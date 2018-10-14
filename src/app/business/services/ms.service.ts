import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@common/core/services/http.client';
import { MS, Event, CalcuTask } from '@models';
import { ListBaseService } from './list-base.service';

@Injectable({
    providedIn: 'root'
})
export class MSService extends ListBaseService {
    protected baseUrl = 'model-tools';
    
    constructor(
        protected http: _HttpClient
    ) { 
        super(http);
    }

    // resolve(): Promise<any> {
    //     return this.findAll({})
    //         .toPromise()
    //         .then(response => {
    //             if (response.error) {
    //                 return Promise.reject(response.error);
    //             } else {
    //                 return Promise.resolve(response.data);
    //             }
    //         });
    // }

    invoke(obj): Observable<any> {
        return this.http.post(`/model-tools/invoke`, {
            msInstance: obj
        });
    }

    getLog(msrId) {
        return this.http.get(`/calculation/log/${msrId}`)
    }
}
