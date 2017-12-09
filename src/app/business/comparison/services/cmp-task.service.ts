import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataInquireService } from '@core/services/data.inquire.service';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';

@Injectable()
export class CmpTaskService implements Resolve<any> {
    constructor(
        private http: _HttpClient,
        private dataInquire: DataInquireService
    ) {}

    resolve() {
        return this.getDataTabTree()
            .toPromise()
            .then(response => {
                if(response.error) {
                    return Promise.reject(response.error);
                }
                else {
                    const tabs = [];
                    if(response.data.personal) {
                        tabs.push({
                            name: 'Your Comparison Tasks',
                            id: 'personal',
                            data: response.data.personal
                        });
                    }
                    if(response.data.public) {
                        tabs.push({
                            name: 'Public Comparison Tasks',
                            id: 'public',
                            data: response.data.public
                        });
                    }
                    return Promise.resolve(tabs)
                }
            });
    }

    getDataTabTree(): Observable<any> {
        return this.http.get('/comparison/tasks');
    }
}
