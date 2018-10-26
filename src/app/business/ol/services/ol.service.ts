import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@core/services/http.client';

@Injectable({
    providedIn: 'root'
})
export class OlService {

    constructor(
        private http: _HttpClient
    ) { }

    getFeatureInfo(url) {
        return Observable.create(observer => {
            fetch(url)
                .then(res => {
                    let parsed
                    try{
                        parsed = res.json()
                    }
                    catch(e) {
                        parsed = null;
                    }
                    finally{
                        return parsed;
                    }
                })
                .then(response => {
                    observer.next(response)
                })
        })
    }
}
