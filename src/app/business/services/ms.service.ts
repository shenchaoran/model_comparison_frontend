import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@common/core/services/http.client';
import { ListBaseService } from './list-base.service';

@Injectable({
    providedIn: 'root'
})
export class MSService extends ListBaseService {
    protected baseUrl = '/model-service';
    
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
        return this.http.post(`/model-service/invoke`, {
            msInstance: obj
        });
    }

    getLog(msrId) {
        return this.http.get(`/calculation/log/${msrId}`)
    }
}
