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

  constructor(private http: HttpClient, private serviceMetaInfoService: ServiceMetaInfoService) {
    this.channel = postal.channel("DATA_INQUIRE_CHANNEL");

    this.channel.subscribe("data.inquire", (data, envelope) => {
      let service: any = _.find(this.items, function (item) {
        return (<any>item).uid === data.serviceId;
      });
      // TODO 优化请求方式
      this.dataInquireRequest2(service, data.params, data.callback);
    })

    let sub_dataInquire_mock = this.channel.subscribe("data.inquire.mock", (data, envelope) => {

      let service: any = _.find(this.items, function (item) {
        return (<any>item).uid === data.serviceId;
      });

      this.http.get(service.url)
        .toPromise()
        .then(res => {
          res = this.lowercaseResponse(res);
          if (_.startsWith(_.get(res, 'status.code'), '200')) {
            let cbChannel = _.split(data.callback, '#')[0];
            let cbTopic = _.split(data.callback, '#')[1];

            postal.channel(cbChannel).publish(cbTopic, { id: data.serviceId, result: _.get(res, 'data') });
          }
        })
        .catch(this.handleError);
    });
  }

  resolve() {
    return this.readConfig().then((config) => {
        this.token = config.token;
        this.items = config.items;
        return;
    });
  }

  private readConfig(): Promise<any> {
    let serviceMetaInfo: ServiceMetaInfo = this.serviceMetaInfoService.getServiceMetaInfo(ROOT_SERVICE_KEY);

    let uri = this.serviceMetaInfoService.addTicket(serviceMetaInfo.uri);

    return this.http.get(uri)
      .toPromise()
      .then((res: Response) => {
        return _.get(res, 'data');
      })
      .catch(this.handleError);
  }

  private getServiceInfo(serviceId: string): Promise<any> {
    let service: any = _.find(this.items, function (item) {
      return (<any>item).uid === serviceId;
    });

    let serviceUri = this.serviceMetaInfoService.addTicket(service.url);

    return this.http.get(serviceUri)
      // .map((res: Response) => res.json())
      .toPromise()
      .then(res => {
        // return res.data.serviceinfo;
        return _.get(res, 'data.serviceinfo');
      })
      .catch(this.handleError);
  }

  private getTemplateInfo(service: any, templateId: string): any {
    return _.find(service.template, function (item) {
      return (<any>item).uid === templateId;
    });
  }

  private dataInquireRequest2(service: any, paramVals: any, callback: string) {


    let uri = service.url + '?token=' + encodeURIComponent(this.token);

    _.forIn(paramVals, (value, key) => {
      uri += "&" + key + "=" + value;
    });

    console.log(uri);

    this.http.get(uri)
      .toPromise()
      .then(res => {
        res = this.lowercaseResponse(res);
        if (_.startsWith(_.get(res, 'status.code'), '200')) {
          let cbChannel = _.split(callback, '#')[0];
          let cbTopic = _.split(callback, '#')[1];

          postal.channel(cbChannel).publish(cbTopic, { id: service.uid, result: _.get(res, 'data') });
        }
      })
      .catch(this.handleError);
  }

  private lowercaseResponse(res){
    for (let key in res){
      if(key === 'Status'){
        let status = res["Status"];
        for(let key in status){
          status[key.toLowerCase()] = status[key];
          delete(status[key]);
        }
        res["status"] = status;
        delete(res["Status"]);
      }
      else if(key === 'Data'){
        res[key.toLowerCase()] = res[key];
        delete(res[key]);
      }
    }

    return res;
  }

  private dataInquireRequest(serviceId: string, serviceInfo: any, templateInfo: any, paramVals: any, callback: string) {
    let routeTemplate = serviceInfo.routeTemplate;
    let method = serviceInfo.method;
    let inputParams = serviceInfo.inputParams;

    if (_.includes(method, 'Get')) {
      let uri = routeTemplate + this.addInputParamsWithToken(inputParams, paramVals, 'Get');

      if (templateInfo !== undefined) {
        uri += this.addGetTemplateParam(templateInfo, '&');

        this.http.get(uri)
          // .map(res => res.json())
          .toPromise()
          .then(res => {
            res = this.lowercaseResponse(res);
            if (_.startsWith(_.get(res, 'status.code'), '200')) {
              let cbChannel = _.split(callback, '#')[0];
              let cbTopic = _.split(callback, '#')[1];

              postal.channel(cbChannel).publish(cbTopic, { id: serviceId, result: _.get(res, 'data') });
            }
          })
          .catch(this.handleError);
      } else {
        this.http.get(uri)
          // .map(res => res.json())
          .toPromise()
          .then(res => {
            res = this.lowercaseResponse(res);
            if (_.startsWith(_.get(res, 'status.code'), '200')) {
              let cbChannel = _.split(callback, '#')[0];
              let cbTopic = _.split(callback, '#')[1];

              postal.channel(cbChannel).publish(cbTopic, { id: serviceId, result: _.get(res, 'data') });
            }
          })
          .catch(this.handleError);
      }
    } else if (_.includes(method, 'Post')) {
      const headers = new HttpHeaders().set("Content-Type", "application/json");

      let requestBody = this.addInputParamsWithToken(inputParams, paramVals, 'Post');

      let uri = routeTemplate;
      if (templateInfo !== undefined) {
        uri += this.addGetTemplateParam(templateInfo, '?');

        this.http.post(uri, requestBody, { headers })
          // .map(res => res.json())
          .toPromise()
          .then(res => {
            if (_.startsWith(_.get(res, 'status.code'), '200')) {
              let cbChannel = _.split(callback, '#')[0];
              let cbTopic = _.split(callback, '#')[1];

              postal.channel(cbChannel).publish(cbTopic, { id: serviceId, result: _.get(res, 'data') });
            }
          })
          .catch(this.handleError);
      } else {
        this.http.post(routeTemplate, requestBody, { headers })
          // .map(res => res.json())
          .toPromise()
          .then(res => {
            res = this.lowercaseResponse(res);
            if (_.startsWith(_.get(res, 'status.code'), '200')) {
              let cbChannel = _.split(callback, '#')[0];
              let cbTopic = _.split(callback, '#')[1];

              postal.channel(cbChannel).publish(cbTopic, { id: serviceId, result: _.get(res, 'data') });
            }
          })
          .catch(this.handleError);
      }
    }
  }

  private addInputParamsWithToken(inputParams: [any], paramVals: any, type: string): string {
    let paramResult;
    if (type === 'Get') {
      paramResult = '?token=' + encodeURIComponent(this.token);
    } else if (type === 'Post') {
      paramResult = 'token=' + encodeURIComponent(this.token);
    }

    _.forEach(inputParams, (param) => {
      let paramKey = param.key;

      let parmaVal = paramVals[paramKey];

      if (parmaVal === undefined && param.isRequired === 1) {

        console.error('#data.inquires.service#参数缺失');
      } else if (parmaVal !== undefined) {
        paramResult += '&' + paramKey + "=" + parmaVal;
      }
    });

    return paramResult;
  }

  private addGetTemplateParam(templateInfo: any, operator: string) {
    let templateUrl = templateInfo.url;
    templateUrl = this.serviceMetaInfoService.addTicket(templateUrl);
    return operator + 'f=custom&templateUrl=' + templateUrl;
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
