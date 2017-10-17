import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServiceMetaInfoService } from '../services/serviceMetaInfo.service';
import { ServiceMetaInfo } from '../metainfo/service.metaInfo';

const ROOT_SERVICE_KEY: string = 'scmresource';

@Injectable()
export class DataInquireService implements Resolve<any> {
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

    public getServiceById (id: string) {
        const service: any = _.find(this.items, function(item) {
            return (<any>item).uid === id;
        });
        if (service === undefined || service === null) {
            return this.handleError(new Error("can't find service"));
        }
        else{
            return service;
        }
    }

    private lowercaseResponse(res) {
        for (let key in res) {
            if (key === 'Status') {
                let status = res['Status'];
                for (let key in status) {
                    status[key.toLowerCase()] = status[key];
                    delete status[key];
                }
                res['status'] = status;
                delete res['Status'];
            } else if (key === 'Data') {
                res[key.toLowerCase()] = res[key];
                delete res[key];
            }
        }

        return res;
    }

    private handleError(error: any) {
        let errMsg = error.message
            ? error.message
            : error.status
              ? `${error.status} - ${error.statusText}`
              : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
