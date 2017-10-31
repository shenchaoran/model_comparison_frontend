import { Injectable  } from '@angular/core'

import { ServiceMetaInfo } from '../metainfo/service.metaInfo';


@Injectable()
export class ServiceMetaInfoService {

    public getServiceMetaInfo(id: string): ServiceMetaInfo {
        let serviceList:Array<ServiceMetaInfo> = JSON.parse(sessionStorage.getItem('serviceMetaList'));

        if(serviceList === undefined){
            return null;
        }

        return _.find(serviceList, function(item) { return item.id === id; });
    }

    public addTicket(uri: string): string {
        let token = JSON.parse(sessionStorage.getItem('authInfo')).token;
        return uri + '?token='+ token;
    }
}