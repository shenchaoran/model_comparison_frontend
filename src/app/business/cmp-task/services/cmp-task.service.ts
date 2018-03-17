import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import * as proj4x from 'proj4';
const proj4 = (proj4x as any).default;

@Injectable()
export class CmpTaskService implements Resolve<any> {
    constructor(private http: _HttpClient) {}

    resolve() {
        return this.findAll({})
            .toPromise()
            .then(response => {
                if (response.error) {
                    return Promise.reject(response.error);
                } else {
                    return Promise.resolve(response.data);
                }
            });
    }

    findAll(query): Observable<any> {
        return this.http.get('/comparison/tasks', {
            params: query
        });
    }

    insert(obj): Observable<any> {
        return this.http.post('/comparison/tasks', obj);
    }

    start(id: string): Observable<any> {
        if (id) {
            return this.http.post(`/comparison/tasks/${id}/start`, undefined);
        } else {
            return undefined;
        }
    }

    findOne(id: string): Observable<any> {
        if (id) {
            return this.http.get(`/comparison/tasks/${id}`);
        } else {
            return undefined;
        }
    }

    /**
     * deprecated
     */
    publishFind(id: string) {
        if (id) {
            this.http.get(`/comparison/tasks/${id}`).subscribe(response => {
                postal.channel('TASK_CHANNEL').publish('find', response);
            });
        } else {
            return undefined;
        }
    }

    changeParticipation(cmpTask) {
        _.map(cmpTask.cmpCfg.ms, ms => {
            _.map(cmpTask.cmpCfg.cmpObjs, cmpObj => {
                _.map(cmpObj.dataRefers, dataRefer => {
                    if (dataRefer.msId === ms.msId) {
                        if (
                            dataRefer.dataId == undefined &&
                            dataRefer.eventName != undefined &&
                            dataRefer.data.field != undefined
                        ) {
                            ms.participate = true;
                        }
                    }
                });
            });
        });
    }

    /**
     * 一次只请求一个计算结果
     */
    getCmpResult(taskId: string, cmpObjId: string, msId: string) {
        if (taskId) {
            return this.http.get(`/comparison/tasks/${taskId}/cmpResult`, {
                params: {
                    msId: msId,
                    cmpObjId: cmpObjId
                }
            });
        } else {
            return undefined;
        }
    }

    getTable(path): Observable<any> {
        if(path) {
            return this.http.get(path, {
                responseType: 'text'
            }, true);
        }
        else {
            return undefined;
        }
    }
}
