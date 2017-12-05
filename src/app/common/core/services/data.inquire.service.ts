import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { ErrorHandle } from '../../../common/core/base/error-handle';

import { APIS, BACKEND } from '@config/api.config';

@Injectable()
export class DataInquireService extends ErrorHandle implements Resolve<any> {

    // deprecated
    resolve() {
        return new Promise((resolve, reject) => {
            // subscribe data inquire event
            const TYPES = ['get', 'post', 'delete', 'put'];
            _.map(TYPES, type => {
                postal.channel('DATA_INQUIRE_CHANNEL').subscribe(`data.inquire.${type}`, (data, envelope) => {
                    this.dataInquire(data, type);
                });
            });
            return resolve();
        });
    }

    constructor(private http: HttpClient) {
        super(); 
    }

    // deprecated 以发布订阅的方式进行http请求
    private dataInquire(data: any, type: string) {
        const serviceId = data.serviceId;
        const params = data.params;
        const query = data.query;
        const body = data.body;
        const options = data.options;
        const cb = data.callback;

        const service: any = _.find(APIS, function(item) {
            return (<any>item).uid === serviceId;
        });
        if (service === undefined || service === null) {
            return this.handleError(new Error("can't find service"));
        }

        let url = service.url;
        url = `http://${BACKEND.host}:${BACKEND.port}${url}`;
        if (params) {
            _.forIn(params, (value, key) => {
                url = _.replace(url, ':' + key, value);
            });
        }

        // attention: body and query can't exist both
        if (query) {
            let isFirst = true;
            _.forIn(query, (value, key) => {
                if(isFirst) {
                    url += '?' + key + '=' + value;
                }
                else {
                    url += '&' + key + '=' + value;
                }
                if(isFirst) {
                    isFirst = false;
                }
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
                        succeed: true,
                        id: serviceId,
                        result: _.get(res, 'data')
                    });
                } else {
                    postal.channel(cbChannel).publish(cbTopic, {
                        succeed: false
                    });
                }
            })
            .catch(this.handleError);
    }

    // 根据serviceId获取url，如果传入了params和query，则根据两个参数解析url
    public getServiceById (id: string, params?: any, query?: any, appendJWT?: boolean): string {
        const service: any = _.find(APIS, function(item) {
            return (<any>item).uid === id;
        });
        if (service === undefined || service === null) {
            this.handleError(new Error("can't find service"));
            return undefined;
        }

        let url = service.url;
        url = `http://${BACKEND.host}:${BACKEND.port}${url}`;
        if (params) {
            _.forIn(params, (value, key) => {
                url = _.replace(url, ':' + key, value);
            });
        }
        if (query) {
            let isFirst = true;
            _.forIn(query, (value, key) => {
                if(isFirst) {
                    url += '?' + key + '=' + value;
                }
                else {
                    url += '&' + key + '=' + value;
                }
                if(isFirst) {
                    isFirst = false;
                }
            });
        }
        if(appendJWT) {
            if(query) {
                url += '&';
            }
            else {
                url += '?';
            }
            const jwtStr = localStorage.getItem('jwt');
            if(jwtStr) {
                const jwt = JSON.parse(jwtStr);
                url += `Authorization=bearer ${jwt.token}`;
            }
        }
        return url;
    }

    
    public get(serviceId: string, params?: any, query?: any, appendJWT?: boolean): Observable<any> {
        const url = this.getServiceById(serviceId, params, query, appendJWT);
        return Observable.create(observer => {
            (<Observable<any>>this.http.get(url))
                .subscribe(response => {
                    if (_.startsWith(_.get(response, 'status.code'), '200')) {
                        observer.next({
                            data: response.data
                        });
                        observer.complete();
                    }
                    else {
                        observer.next({
                            error: response.status
                        });
                        observer.complete();
                    }
                });
        });
    }
}
