import { getFakeList } from './../test/data/mock-user-issues';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@common/core/services/http.client';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { USER } from "../test/data/mock-user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    _jwt;
    constructor(
        private http: _HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) {
        var jwt = localStorage.getItem('jwt')
        if(jwt) {
            jwt = JSON.parse(jwt)
            this._jwt = jwt;
        }
    }

    set jwt(jwt) {
        this._jwt = jwt;
        if(jwt) {
            localStorage.setItem('jwt', JSON.stringify(jwt));
            let url = this.route.snapshot.queryParams['redirect'];
            if (!url || url.indexOf('#/user/sign') !== -1) {
                this.router.navigate(['/home']);
            }
            else {
                this.router.navigate([url]);
            }
        }
    }

    get jwt() { 
        return this._jwt;
    }

    signIn(user): Observable<any> {
        var self = this;
        return this.http.post('/user/sign-in', user)
            .pipe(
                map(res => {
                    if (res.error) {
                        console.error('error in user.service: ', `${res.error.code} - ${res.error.desc}`);
                        return res;
                    }
                    else {
                        res.data.user.rememberAccount = user.rememberAccount;
                        self.jwt = res.data;
                        return res;
                    }
                })
            );
    }

    signOut() {
        localStorage.removeItem('jwt');
        this.jwt = null;
    }

    signUp(user): Observable<any> {
        var self = this;
        return this.http.post('/user/sign-up', user)
            .pipe(
                map(res => {
                    if (res.error) {
                        console.error('error in user.service: ', `${res.error.code} - ${res.error.desc}`);
                        return res;
                    }
                    else {
                        res.data.user.rememberAccount = user.rememberAccount;
                        self.jwt = res.data;
                        return res;
                    }
                })
            )
    }

    passwordReset(user): Observable<any> {
        return this.http.post('user/password-reset', user);
    }

    hadLogin(): boolean {
        return this.jwt && this.jwt.expires > Date.now()
    }

    get user() {
        if (this.hadLogin()) {
            return this.jwt.user;
        }
        else {
            return null;
        }
    }

    get token() {
        if (this.hadLogin()) {
            return this.jwt.token;
        }
        else {
            return null;
        }
    }

    checkLogin() {
        if (!this.hadLogin()) {
            this.router.navigate(['../..', 'login'], {
                relativeTo: this.route,
                queryParams: {
                    redirect: (window as any).location.hash
                }
            });
        }
        return this.hadLogin();
    }

    static getUser() {
        var jwt = localStorage.getItem('jwt')
        if(jwt) {
            jwt = JSON.parse(jwt)
            if(jwt && (jwt as any).expires > Date.now()) {
                return (jwt as any).user;
            }
        }
        return null;
    }

    //* 获取模拟的用户信息
    getMockuser(){
        return USER;
    }

    //* 获取用户相关issues
    getMockUserIssues(){
        console.log(getFakeList());
        return getFakeList();
    }
}
