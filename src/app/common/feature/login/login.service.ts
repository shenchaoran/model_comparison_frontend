import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@core/services/http.client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { APP_CONFIG } from '@config/app.config';
import { ErrorHandle } from '@core/base/error-handle';

@Injectable()
export class LoginService extends ErrorHandle {
    constructor(
        private http: _HttpClient,
        private router: Router,
        private _notification: NzNotificationService
    ) {
        super();
    }

    public postLogin(username: string, password: string): Observable<any> {
        return Observable.create(observer => {
            let loginPostData = {
                username: username,
                password: password
            };
            this.http
                .post('/auth/login', loginPostData)
                .subscribe({
                    next: response => {
                        const res = <any>response;
                        if (res.error) {
                            const err = <any>new Error(res.status.desc);
                            err.status = res.status.code;
                            console.log(`#login.service# ${res.status.code} - ${res.status.desc}`);
                            this.router.navigate(['/login']);
                            observer.next(err);
                        } 
                        else {
                            // console.log(APP_CONFIG.defaultroute);
                            localStorage.setItem('jwt',JSON.stringify(res.data.jwt));
                            this.router.navigate(['/' + APP_CONFIG.defaultroute]);
                        }
                    },
                    error: err => {
                        observer.next(err);
                    },
                    complete: () => {}
                });
        });
    }

    public hasLogin(): boolean {
        const jwtStr = localStorage.getItem('jwt');
        if(jwtStr) {
            const jwt = JSON.parse(jwtStr);
            if (jwt !== null && jwt.expires > Date.now()) {
                if(jwt.user.username === 'Tourist') {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        return false;
    }

    static getUser() {
        const jwtStr = localStorage.getItem('jwt');
        if(jwtStr) {
            const jwt = JSON.parse(jwtStr);
            if (jwt !== null && jwt.expires > Date.now()) {
                return jwt.user;
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
}
