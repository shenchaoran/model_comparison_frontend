import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataInquireService } from '@core/services/data.inquire.service';

@Injectable()
export class ModelService {
    constructor(
        private _notification: NzNotificationService,
        private http: HttpClient,
        private dataInquire: DataInquireService
    ) {}

    getModelTabTree(): Observable<any> {
        return this.dataInquire.get('getModelTabTree');
    }

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
}
