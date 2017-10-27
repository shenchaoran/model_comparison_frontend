import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ErrorHandle } from '../../../common/core/base/error-handle';

import { ServiceMetaInfoService } from '../services/serviceMetaInfo.service';
import { ServiceMetaInfo } from '../metainfo/service.metaInfo';

const ROOT_SERVICE_KEY: string = 'scmresource';

@Injectable()
export class DataInquireService extends ErrorHandle implements Resolve<any> {
    private token: string;
    public items: any;
    private channel: any;

    resolve() {
        return this.readConfig().then(config => {
            this.token = config.token;
            this.items = config.items;
            return;
        });
    }

    private readConfig(): Promise<any> {
        let serviceMetaInfo: ServiceMetaInfo = this.serviceMetaInfoService.getServiceMetaInfo(
            ROOT_SERVICE_KEY
        );

        let uri = this.serviceMetaInfoService.addTicket(serviceMetaInfo.uri);

        return this.http
            .get(uri)
            .toPromise()
            .then((res: Response) => {
                return _.get(res, 'data');
            })
            .catch(this.handleError);
    }

    constructor(
        private http: HttpClient,
        private serviceMetaInfoService: ServiceMetaInfoService
    ) {
        super();
        this.channel = postal.channel('DATA_INQUIRE_CHANNEL');
        const TYPES = ['get', 'post', 'delete', 'put'];
        _.map(TYPES, type => {
            this.channel.subscribe(`data.inquire.${type}`, (data, envelope) => {
                this.dataInquire(data, type);
            });
        });
    }

    private dataInquire(data: any, type: string) {
        const serviceId = data.serviceId;
        const params = data.params;
        const query = data.query;
        const body = data.body;
        const options = data.options;
        const cb = data.callback;

        const service: any = _.find(this.items, function(item) {
            return (<any>item).uid === serviceId;
        });
        if (service === undefined || service === null) {
            return this.handleError(new Error("can't find service"));
        }

        let url = service.url;
        if (params) {
            _.forIn(params, (value, key) => {
                url = _.replace(url, ':' + key, value);
            });
        }

        url += '?token=' + encodeURIComponent(this.token);
        // attention: body and query can't exist both
        if (query) {
            _.forIn(query, (value, key) => {
                url += '&' + key + '=' + value;
            });
        }

        console.log(`${type}: ${url}`);

        let observable;
        switch (type) {
            case 'get':
                observable = this.http.get(url, options);
                break;
            case 'post':
                observable = this.http.post(url, body, options);
                break;
            case 'put':
                observable = this.http.put(url, body, options);
                break;
            case 'delete':
                observable = this.http.delete(url, options);
                break;
            // case ...
        }
        observable
            .toPromise()
            .then(res => {
                let cbChannel = _.split(cb, '#')[0];
                let cbTopic = _.split(cb, '#')[1];
                if (_.startsWith(_.get(res, 'status.code'), '200')) {
                    postal.channel(cbChannel).publish(cbTopic, {
                        successed: true,
                        id: serviceId,
                        result: _.get(res, 'data')
                    });
                } else {
                    postal.channel(cbChannel).publish(cbTopic, {
                        successed: false
                    });
                }
            })
            .catch(this.handleError);
    }

    public getServiceById (id: string, params?: any, query?: any): string {
        const service: any = _.find(this.items, function(item) {
            return (<any>item).uid === id;
        });
        if (service === undefined || service === null) {
            this.handleError(new Error("can't find service"));
            return undefined;
        }

        let url = service.url;
        if (params) {
            _.forIn(params, (value, key) => {
                url = _.replace(url, ':' + key, value);
            });
        }
        url += '?token=' + encodeURIComponent(this.token);
        if (query) {
            _.forIn(query, (value, key) => {
                url += '&' + key + '=' + value;
            });
        }
        return url;
    }
}
