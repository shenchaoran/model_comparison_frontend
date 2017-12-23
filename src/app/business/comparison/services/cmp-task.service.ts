import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataInquireService } from '@core/services/data.inquire.service';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import * as proj4x from 'proj4';
const proj4 = (proj4x as any).default;

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

    extractHeader(geojson: any):any {
        if(geojson.features.length && geojson.features[0].geometry.type === 'Polygon') {
            const leftBottom = geojson.features[0].geometry.coordinates[0][3];
            const rightTop = geojson.features[0].geometry.coordinates[0][1];
            const lb3857 = proj4('EPSG:3857', leftBottom);
            const rt3857 = proj4('EPSG:3857', rightTop);
            return {
                xllcorner: lb3857[0],
                yllcorner: lb3857[1],
                // cellsize: ,
                // ncols: ,
                // nrows: ,
                NODATA_value: -9999
            };
        }
        else {
            return undefined;
        }
    }

    insert(doc): Observable<any> {
        return this.http.post('/comparison/tasks', {doc: doc});
    }

    start(id: string): Observable<any> {
        if(id) {
            return this.http.post(`/comparison/tasks/${id}/start`, undefined);
        }
        else {
            return undefined;
        }
    }

    find(id: string): Observable<any> {
        if(id) {
            return this.http.get(`/comparison/tasks/${id}`);
        }
        else {
            return undefined;
        }
    }

    publishFind(id: string) {
        if(id) {
            this.http.get(`/comparison/tasks/${id}`)
                .subscribe(response => {
                    postal
                        .channel('TASK_CHANNEL')
                        .publish('find', response);
                });
        }
        else {
            return undefined;
        }
    }
}
