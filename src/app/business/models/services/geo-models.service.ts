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
     * 将schema放在data下面
     */
    newInstance(ms): CalcuTask {
        const task = new CalcuTask();
        task.msId = ms._id;
        task.msName = ms.MDL.meta.name;
        task.nodeName = ms.auth.nodeName;
        task.IO = _.cloneDeep(ms.MDL.IO);
        task.IO.dataSrc = 'STD';
        function setEventValue(event) {
            if (event.type === 'output') {
                if (event.optional) {
                    event.options = [
                        {
                            label: 'off',
                            value: 'off'
                        },
                        {
                            label: event.id,
                            value: event.id
                        }
                    ];
                    event.value = event.defaultOutput ? event.id : 'off';
                }
                else {
                    event.value = event.id;
                }
            }

            if (event.type === 'input' && _.get(event, 'schema.structure.type') === 'date') {
                event.value = (new Date()).getTime();
            }
            if (_.get(event, 'schema.structure.type') === 'checkbox') {
                event.value = [];
            }
            if (_.get(event, 'schema.structure.type') === 'radio') {
                event.value = _.get(event, 'event.schema.structure.options[0]');
            }
        }
        _.map(task.IO.schemas, schema => {
            _.map(task.IO.data, event => {
                if (event.schemaId === schema.id) {
                    event.schema = schema;
                    setEventValue(event);
                }
            });
            _.map(task.IO.std, event => {
                if (event.schemaId === schema.id) {
                    event.schema = schema;
                    setEventValue(event);
                }
            })
        });

        return task;
    }
}
