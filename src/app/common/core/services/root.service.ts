import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const root_config: string = './config/root.{env}.config.json';

@Injectable()
export class RootService implements Resolve<any> {

    private errorMessage: any;

    constructor(private http: HttpClient) {

    }

    resolve() {
        let env = jQuery('meta[name=environment]').attr('content');
        this.loadRootConfig(env);
    }

    private loadRootConfig(env: string) {
        this.readConfig(env).subscribe({
            next: configData => {
                sessionStorage.setItem('serviceMetaList', JSON.stringify(configData.servicelist));
                sessionStorage.setItem('arcgisPath', JSON.stringify(configData.arcgispath));
            },
            error: err => this.handleError(err)
        });
    }

    readConfig(env: string): Observable<any> {
        const config = _.replace(root_config, '{env}', env);
        return this.http.get(config)
            // .map(data => data.json())
            .catch(this.handleError);
    }


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}