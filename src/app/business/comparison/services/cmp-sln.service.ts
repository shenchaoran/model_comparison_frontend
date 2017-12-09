import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataInquireService } from '@core/services/data.inquire.service';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';

@Injectable()
export class CmpSlnService implements Resolve<any> {
    constructor(
        private http: _HttpClient,
        private dataInquire: DataInquireService
    ) {}

    resolve() {
        return this.getSlnTabTree()
            .toPromise()
            .then(response => {
                if(response.error) {
                    return Promise.reject(response.error);
                }
                else {
                    const tabs = [];
                    if(response.data.personal) {
                        tabs.push({
                            name: 'Your Comparison Solutions',
                            id: 'personal',
                            data: response.data.personal
                        });
                    }
                    if(response.data.public) {
                        tabs.push({
                            name: 'Public Comparison Solutions',
                            id: 'public',
                            data: response.data.public
                        });
                    }
                    return Promise.resolve(tabs);
                }
            });
    }

    getSlnTabTree(): Observable<any> {
        return this.http.get('/comparison/solutions');
    }
}
