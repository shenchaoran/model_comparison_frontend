import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from './list-base.service';
import { MS } from '../models';

@Injectable({
    providedIn: 'root'
})
export class MSService extends ListBaseService {
    protected baseUrl = '/model-service';

    public mss: MS[];
    public msCount: number;
    public ms: MS;
    
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

    findAll(where) {
        return this.http.get(`${this.baseUrl}`).pipe(map(res => {
            if(!res.error) {
                this.mss = res.data.docs;
                this.msCount = res.data.count;
            }
            return res;
        }))
    }

    public clear() {
        this.mss = [];
        this.msCount = null;
        this.ms = null;
    }
}
