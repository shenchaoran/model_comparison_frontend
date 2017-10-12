import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { AppMetaInfoService } from '../../core/services/appMetaInfo.service';
import { ServiceMetaInfoService } from '../../core/services/serviceMetaInfo.service';

import { AuthInfo } from '../../core/metainfo/auth.metaInfo';
import { AppMetaInfo } from '../../core/metainfo/app.metaInfo';
import { ServiceMetaInfo } from '../../core/metainfo/service.metaInfo';
import { LoginPostData } from './login.post.data';

const ROOT_SERVICE_KEY: string = 'login';

@Injectable()
export class LoginService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private appMetaInfoService: AppMetaInfoService,
        private serviceMetaInfoService: ServiceMetaInfoService
    ) {}

    public verifyLogin(userid: string, userpsd: string): Observable<any> {
        return Observable.create(observer => {
            let appMetaInfo: AppMetaInfo = this.appMetaInfoService.getAppMetaInfo();

            this.requestLoginService(
                userid,
                userpsd,
                appMetaInfo.appid
            ).subscribe({
                next: configData => {
                    if (configData.status.code !== '200') {
                        observer.next(configData.data.info);
                        console.log(
                            `#login.service# ${configData.status
                                .code} - ${configData.data.info}`
                        );

                        // this.router.navigate(['/login']);
                    } else {
                        // let authInfo = new AuthInfo(true, configData.ticket, configData.data[0].linfo.logintime, configData.data[0].linfo.loginip, configData.data[0].uinfo.nickname);
                        // sessionStorage.setItem('authInfo', authInfo.parse2Json());
                        sessionStorage.setItem(
                            'authInfo',
                            JSON.stringify({
                                islogin: true
                            })
                        );

                        // observer.next(null);
                        this.router.navigate(['/' + appMetaInfo.defaultroute]);
                    }
                },
                error: err => this.handleError(err),
                complete: () => {}
            });
        });
    }

    private requestLoginService(
        account: string,
        password: string,
        appid: string,
        version?: string
    ): Observable<any> {
        let loginPostData: LoginPostData = new LoginPostData(
            appid,
            account,
            password
        );
        let serviceMetaInfo: ServiceMetaInfo = this.serviceMetaInfoService.getServiceMetaInfo(
            ROOT_SERVICE_KEY
        );

        let type = serviceMetaInfo.type;
        if (type === 1) {
            return (
                this.http
                    .get(serviceMetaInfo.uri)
                    // .map((res: Response) => res.json())
                    .catch(this.handleError)
            );
        } else if (type === 3) {
            // const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
            // let requestOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
            // return this.http.post(serviceMetaInfo.uri, loginPostData, {
            //     headers
            // })
            return (
                this.http
                    .post(serviceMetaInfo.uri, loginPostData)
                    // .map((res: Response) => res.json())
                    .catch(this.handleError)
            );
        }
    }

    private showLoginFailure(errorCode: any, dataInfo: string) {
        alert(dataInfo);
    }

    private handleError(error: any) {
        let errMsg = error.message
            ? error.message
            : error.status
              ? `${error.status} - ${error.statusText}`
              : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
