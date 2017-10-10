import { Injectable  } from '@angular/core'

import { AppMetaInfo } from '../metainfo/app.metaInfo';


@Injectable()
export class AppMetaInfoService {

    public getAppMetaInfo(): AppMetaInfo {
        let appMetaInfo: AppMetaInfo = JSON.parse(sessionStorage.getItem('appMetaInfo'));


        if(appMetaInfo === undefined){
            return null;
        }

        return appMetaInfo;
    }
}



