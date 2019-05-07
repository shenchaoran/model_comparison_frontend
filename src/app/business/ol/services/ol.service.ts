import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@core/services/http.client';

let counter = 1;
@Injectable({
    providedIn: 'root'
})
export class OlService {

    constructor(
        private http: _HttpClient
    ) {
        console.log('******** OlService constructor ', counter++);
    }

    getFeatureInfo(url) {
        return Observable.create(observer => {
            fetch(url)
                .then(res => {
                    let parsed
                    try{
                        parsed = res.json() //* geoServer 返回的是html格式数据，需要配置成返回json数据，不然这个地方会报错。
                        return observer.next(parsed)
                    }
                    catch(e) {
                        parsed = null;
                        return observer.error(e)
                    }
                })
        })
    }
}
