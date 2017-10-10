import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { ServiceMetaInfoService } from '../services/serviceMetaInfo.service';
import { ServiceMetaInfo } from '../metainfo/service.metaInfo';

const ROOT_SERVICE_KEY: string = 'modules';
const ROOT_SERVICE_KEY_2: string = 'moduleconfig';

@Injectable()
export class ModulesConfigService implements Resolve<any> {

    constructor(private http: HttpClient, private serviceMetaInfoService: ServiceMetaInfoService) {

    }

    resolve() {
        return this.readConfig().then((config)=> {
            sessionStorage.setItem('moduleMeataList', JSON.stringify(config));

            return true;
        });
    }

    private readConfig(): Promise<any> {
        let serviceMetaInfo: ServiceMetaInfo = this.serviceMetaInfoService.getServiceMetaInfo(ROOT_SERVICE_KEY);

        let uri = serviceMetaInfo.uri;
        if (serviceMetaInfo.type === 3) {
            uri = this.serviceMetaInfoService.addTicket(uri);
        }

        return this.http.get(uri)
            .toPromise()
            .then((res: Response) => { return _.get(res, 'data'); })
            .catch(this.handleError);
    }

    // private readConfig(): Observable<any> {
    //     let serviceMetaInfo: ServiceMetaInfo = this.serviceMetaInfoService.getServiceMetaInfo(ROOT_SERVICE_KEY);

    //     let uri = this.serviceMetaInfoService.addTicket(serviceMetaInfo.uri);

    //     return this.http.get(uri)
    //                 .map(res => res.json().data)
    //                 .catch(this.handleError);
    // }

    public getChildrenModules(moduleEncode: string) {
        let _module = this.getModuleByEncode(moduleEncode);

        if (_module && _module.children.length > 0) {
            return _.map(_module.children, 'encode');

        } else {
            return null;
        }
    }

    public getModuleFunctions(parentModuleEncode: string, moduleEncode: string) {
        let _module: any;

        if (parentModuleEncode == null) {
            _module = this.getModuleByEncode(moduleEncode);
        } else {
            let _parentModule = this.getModuleByEncode(parentModuleEncode);

            _module = _.find(_parentModule.children, (item) => {
                return item.encode === moduleEncode;
            });
        }

        return this.loadModuleFunctions(_module.id);
    }

    private getModuleByEncode(encode: string) {
        let moduleList = JSON.parse(sessionStorage.getItem('moduleMeataList'));

        return _.find(moduleList, (item) => {
            return item.encode === encode;
        });
    }

    private loadModuleFunctions(id): Promise<any> {
        let serviceMetaInfo: ServiceMetaInfo = this.serviceMetaInfoService.getServiceMetaInfo(ROOT_SERVICE_KEY_2);

        let uri = serviceMetaInfo.uri;
        if (serviceMetaInfo.type === 3) {
            uri = this.serviceMetaInfoService.addTicket(uri);
            uri += '&moduleInfoId=' + id;

            return this.http.get(uri)
                .toPromise()
                .then((res: Response) => { return _.get(res, 'data'); })
                .catch(this.handleError);
        } else if (serviceMetaInfo.type === 1) {
            return this.http.get(uri)
            .flatMap(data => _.get(data, 'data'))
            .filter((data: any) => {
                return data.moduleinfoid == id;
              })
              .toPromise()
              .then((res: any) => { return res.functions; })
              .catch(this.handleError);
        }
    }


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}