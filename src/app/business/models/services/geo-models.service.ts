import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import { MS, Event, CalcuTask } from '@models';

@Injectable()
export class MSService {
    constructor(
        private http: _HttpClient
    ) { }

    resolve(): Promise<any> {
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
        return this.http.get('/model-tools', {
            params: query
        });
    }

    findOne(id): Observable<any> {
        return this.http.get(`/model-tools/${id}`);
    }

    invoke(id, obj): Observable<any> {
        return this.http.post(`/model-tools/${id}/invoke`, obj);
    }

    /**
     * 创建一个 计算任务 实例，并将schema放在event下面
     * 
     * @param {any} ms 
     * @returns {CalcuTask} 
     * @memberof MSService
     */
    newInstance(ms): CalcuTask {
        const task = new CalcuTask();
        task.msId = ms._id;
        task.msName = ms.MDL.meta.name;
        task.nodeName = ms.auth.nodeName;
        task.IO = _.cloneDeep(ms.MDL.IO);
        task.IO.dataSrc = 'STD';
        task.stdInputId = ms.stdInputId;
        task.stdOutputId = ms.stdOutputId;
        _.map(task.IO.schemas, schema => {
            function appendSchema(type) {
                _.map(task.IO[type], event => {
                    if (event.schemaId === schema.id) {
                        event.schema = schema;
                    }
                });
            }
            appendSchema('inputs');
            appendSchema('std');
            appendSchema('parameters');
            appendSchema('outputs');
        });

        return task;
    }
}
