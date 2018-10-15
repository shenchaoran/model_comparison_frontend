import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { _HttpClient } from '@common/core/services/http.client';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

// var counter = 1;

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _jwt;
    // TODO 改成一旦有订阅，立即发布当前状态
    public logined$: BehaviorSubject<boolean>;

    constructor(
        private http?: _HttpClient,
        private route?: ActivatedRoute,
        private router?: Router,
        private location?: Location,
    ) {
        // console.log('********* ', counter++, '  UserService constructor')
        var jwt = localStorage.getItem('jwt');
        if (this.isLogined) {
            this.logined$ = new BehaviorSubject<boolean>(true);
            jwt = JSON.parse(jwt);
            this._jwt = jwt;
        }
        else {
            this.logined$ = new BehaviorSubject<boolean>(false);
        }
    }

    public set jwt(jwt) {
        this._jwt = jwt;
        console.log('current login state: ' + this.logined$.value);
        if (jwt) {
            localStorage.setItem('jwt', JSON.stringify(jwt));
            let url = this.route.snapshot.queryParams['redirect'];
            this.logined$.next(true);
            if (!url || url.indexOf('#/user/sign') !== -1) {
                this.router.navigate(['/home']);
            }
            else {
                this.router.navigate([url]);
            }
        }
        else {
            localStorage.removeItem('jwt');
            this.logined$.next(false);
        }
    }

    public get jwt() {
        return this._jwt;
    }

    public get user() {
        if (this.isLogined) {
            return this.jwt.user;
        }
        else {
            return null;
        }
    }

    public get token() {
        if (this.isLogined) {
            return this.jwt.token;
        }
        else {
            return null;
        }
    }

    public get redirect() {
        var url = this.location.path();
        var index = url.indexOf('?');
        if (index !== -1)
            url = url.substring(0, index);
        return (url === '/user/sign-in' || url === '/user/sign-up') ? '' : url;
    }

    private get isLogined(): boolean {
        return this.jwt && this.jwt.expires > Date.now();
    }

    signIn(user): Observable<any> {
        return this.http.post('/user/sign-in', user)
            .pipe(
                map(res => {
                    if (res.error) {
                        console.error('error in user.service: ', `${res.error.code} - ${res.error.desc}`);
                        return res;
                    }
                    else {
                        res.data.user.rememberAccount = user.rememberAccount;
                        this.jwt = res.data;
                        return res;
                    }
                })
            );
    }

    signOut() {
        this.jwt = null;
    }

    signUp(user): Observable<any> {
        return this.http.post('/user/sign-up', user)
            .pipe(
                map(res => {
                    if (res.error) {
                        console.error('error in user.service: ', `${res.error.code} - ${res.error.desc}`);
                        return res;
                    }
                    else {
                        res.data.user.rememberAccount = user.rememberAccount;
                        this.jwt = res.data;
                        return res;
                    }
                })
            )
    }

    passwordReset(user): Observable<any> {
        return this.http.post('user/password-reset', user);
    }

    /**
     * 检查是否登录，如果没有登录，则先重定向到登录页面
     */
    redirectIfNotLogined() {
        if (!this.isLogined) {
            this.router.navigate(['../..', 'login'], {
                relativeTo: this.route,
                queryParams: {
                    redirect: this.redirect
                }
            });
            return false;
        }
        return true;
    }
}
