import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import { MS, Event } from '@models/model-service.class';

@Injectable()
export class MSService {
    constructor(
        private http: _HttpClient
    ) {}

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

    // getModelTabTree(): Observable<any> {
    //     return this.http.get('/model-tools');
    // }

    findAll(query): Observable<any> {
        return this.http.get('/model-tools', {
            params: query
        });
    }

    findOne(id): Observable<any> {
        return this.http.get(`/model-tools/${id}`);
    }

    convert2List(tree: any) {
        return tree[0].items;
    }

    // 返回的data还是list形式，过滤了点还是区域这个控制参数类型
    UDXDataFilter(MS, filter: 'point' | 'polygon' | 'multi-point'): Event[] {
        const filtered: Event[] = [];
        const data = MS.MDL.IO.data;
        const fathers = _.filter(data, item => item.parentId === 'root');
        const recurFunc = (father) => {
            let childrenId = [];
            if(father.options && father.options.length) {
                if(father.optionType === 'value') {
                    if(_.indexOf(father.options, filter) !== -1) {
                        const newFathers = _.filter(data, item => item.parentId === father.id + '#' + filter);
                        _.map(newFathers, recurFunc);
                    }
                }
                else if(father.optionType === 'file') {
                    childrenId = father.options;
                }
            }
            else {
                filtered.push(father);
                if(father.childrenId && father.childrenId.length) {
                    childrenId = father.childrenId;
                }
            }

            _.map(childrenId, id => {
                const newFather = _.find(data, item => item.id === id);
                recurFunc(newFather);
            });
            
        };
        _.map(fathers, recurFunc);
        return filtered;
    }

    UDXData2Tree(MS) {
        return MS;
    }

    // region deprecated
    getModelTools(params, query, body) {
        postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire.get', {
            serviceId: 'getModelTools',
            callback: 'MODEL_TOOL_CHANNEL#getModelTools',
            query: query,
            body: body,
            options: undefined,
            params: params
        });
    }

    getModelTool(params, query, body) {
        postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire.get', {
            serviceId: 'getModelTool',
            callback: 'MODEL_TOOL_CHANNEL#getModelTool',
            query: query,
            body: body,
            options: undefined,
            params: params
        });
    }

    getModelInput(params, query, body) {
        postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire.get', {
            serviceId: 'getModelInput',
            callback: 'MODEL_TOOL_CHANNEL#getModelInput',
            query: query,
            body: body,
            options: undefined,
            params: params
        });
    }

    invokeModelTool(params, query, body) {
        postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire.post', {
            serviceId: 'invokeModelTool',
            callback: 'MODEL_TOOL_CHANNEL#invokeModelTool',
            query: query,
            body: body,
            options: {
                headers: new HttpHeaders().set(
                    'Content-Type',
                    'application/x-www-form-urlencoded'
                )
            },
            params: params
        });
    }

    getInvokeRecord(params, query, body) {
        postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire.get', {
            serviceId: 'getInvokeRecord',
            callback: 'MODEL_TOOL_CHANNEL#getInvokeRecord',
            query: query,
            body: body,
            options: undefined,
            params: params
        });
    }
    // endregion
}
