import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { ServiceMetaInfoService } from '../../../core/services/serviceMetaInfo.service';
import { ServiceMetaInfo } from '../../../core/metainfo/service.metaInfo';

const ROOT_SERVICE_KEY: string = 'mapToolbar';

@Injectable()
export class MapToolBarService {
    constructor(private http: HttpClient, private serviceMetaInfoService: ServiceMetaInfoService) { }

    readConfig(): Observable<any> {
        let serviceMetaInfo: ServiceMetaInfo = this.serviceMetaInfoService.getServiceMetaInfo(ROOT_SERVICE_KEY);

        return this.http.get(serviceMetaInfo.uri)
            .map(data => _.get(data, 'data'))
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }


}