// TODO 唯一的实例 装饰器
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@core/services/http.client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { ErrorHandle } from '@core/base/error-handle';

@Injectable()
export class LoginService extends ErrorHandle {
    constructor(
        private http: _HttpClient,
        private router: Router,
//private _notice: NzNotificationService,
        private route: ActivatedRoute,
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
                            localStorage.setItem('jwt',JSON.stringify(res.data.jwt));
                            let url = this.route.snapshot.queryParams['redirect'];
                            url = (url as string).substr(2);
                            if(!url || url.indexOf('#/login') !== -1) {
                                this.router.navigate(['/home']);
                            }
                            else {
                                this.router.navigate([url]);
                            }
                        }
                    },
                    error: err => {
                        observer.next(err);
                    },
                    complete: () => {}
                });
        });
    }

    public loginOut() {
        localStorage.removeItem('jwt');
        // this._notification.success('Notice', 'Logout out succeed!');
    }

    public hasLogin(): boolean {
        const jwtStr = localStorage.getItem('jwt');
        if(jwtStr) {
            const jwt = JSON.parse(jwtStr);
            if (jwt !== null && jwt.expires > Date.now()) {
                return true;
            }
            else {
                return false;
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

    getUser() {
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

    getToken() {
        const jwtStr = localStorage.getItem('jwt');
        if(jwtStr) {
            const jwt = JSON.parse(jwtStr);
            if (jwt !== null && jwt.expires > Date.now()) {
                return jwt.token;
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }

    /**
     * 检查是否登录，如果没有登录，先登录在重定向到这个页面
     * @returns hasLogin
     * @memberof LoginService
     */
    checkLogin() {
        let user = this.getUser();
        if(!user) {
            this.router.navigate(['../..', 'login'], {
                relativeTo: this.route,
                queryParams: {
                    redirect: (window as any).location.hash
                }
            });
        }
        return !(user === undefined);
    }
}
