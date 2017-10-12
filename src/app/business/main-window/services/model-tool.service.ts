import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class ModelToolService implements Resolve<any> {
    resolve() {
        return Observable.create(observer => {
            postal
                .channel('MODEL_TOOL_CHANNEL')
                .subscribe('getModelTools', (data, envelope) => {
                    if (data.successed) {
                        observer.next(data.result);
                        observer.complete();
                    } else {
                        this._notification.create(
                            'warning',
                            'Warning:',
                            'loading model library failed, please retry later!'
                        );
                        observer.next(null);
                        observer.complete();
                    }
                });
            this.getModelTools(undefined, undefined, undefined, undefined);
        });
    }

    constructor(private _notification: NzNotificationService) {}

    getModelTools(params, query, body, options) {
        postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire.get', {
            serviceId: 'getModelTools',
            callback: 'MODEL_TOOL_CHANNEL#getModelTools',
            query: query,
            body: body,
            options: options,
            params: params
        });
    }

    getModelTool(params, query, body, options) {
        postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire.get', {
            serviceId: 'getModelTool',
            callback: 'MODEL_TOOL_CHANNEL#getModelTool',
            query: query,
            body: body,
            options: options,
            params: params
        });
    }

    getModelInput(params, query, body, options) {
        postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire.get', {
            serviceId: 'getModelInput',
            callback: 'MODEL_TOOL_CHANNEL#getModelInput',
            query: query,
            body: body,
            options: options,
            params: params
        });
    }

    invokeModelTool(params, query, body, options) {
        postal.channel('DATA_INQUIRE_CHANNEL').publish('data.inquire.post', {
            serviceId: 'invokeModelTool',
            callback: 'MODEL_TOOL_CHANNEL#invokeModelTool',
            query: query,
            body: body,
            options: options,
            params: params
        });
    }
}
