import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@common/core/services/http.client';

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
                .then(res => res.json())
                .then(response => {
                    observer.next(response)
                })
        })
    }
}
