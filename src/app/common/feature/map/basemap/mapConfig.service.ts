import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { ServiceMetaInfoService } from '../../../core/services/serviceMetaInfo.service';
import { ServiceMetaInfo } from '../../../core/metainfo/service.metaInfo';

const ROOT_SERVICE_KEY: string = 'map';

@Injectable()
export class MapConfigService implements Resolve<any> {
    // private loaded = false;
    // mapConfig: any;

    constructor(private http: HttpClient, private serviceMetaInfoService: ServiceMetaInfoService) { 

        // this.readConfig().subscribe({
        //     next: mapConfig => { this.mapConfig = mapConfig; }
        // });
    }

    resolve() {
        // this.readConfig().then((mapConfig)=>{
        //     this.mapConfig = mapConfig;   

        //     return this.mapConfig;
        // });

        return this.readConfig();
    }

    // readConfig(): Promise<any> {
    //     let serviceInfo = this.rootService.getServiceMetaInfo(root_service_key);
        
    //     return this.http.get(serviceInfo.uri)
    //                 .toPromise()
    //                 .then((res: Response)=> { return res.json().data; })
    //                 .catch(this.handleError);
    // }

    readConfig(): Observable<any> {
        let serviceMetaInfo: ServiceMetaInfo = this.serviceMetaInfoService.getServiceMetaInfo(ROOT_SERVICE_KEY);

        let uri = this.serviceMetaInfoService.addTicket(serviceMetaInfo.uri);

        return this.http.get(uri)
                    .map(res => _.get(res, 'data'))
                    .catch(this.handleError);
    }

    // getTokens(mapConfig){
    //     for(let token of mapConfig.tokens) {
    //         if(token.type === 'web'){
    //             this.loadToken(token.url).subscribe(
    //                 tokenVal => { token.val = tokenVal; },
    //                 error => this.handleError(error),
    //                 () => { }   
    //             );
    //         }
    //     }
    // }

    loadToken(url): Observable<string>{
        return this.http.get(url)
                        .map(res => {
                            return (<any>res).text();
                        })
                        .catch(this.handleError);
    }
    // loadToken(url): Promise<string>{
    //     return this.http.get(url)
    //                     .toPromise()
    //                     .then(res => {return res.text()})
    //                     .catch(this.handleError);
    // }

    // getTokenValue(tokenId){
    //     let token = _.find(this.mapConfig.tokens, function(o){
    //                 return (<any>o).id === tokenId;
    //             });
    //     return (<any>token).val;        
    // }

    
    
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}