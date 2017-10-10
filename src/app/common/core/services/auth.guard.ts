import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';

import { AuthInfo } from '../metainfo/auth.metaInfo';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(private router: Router) {

   }

    canActivate(): boolean {

        let authInfo: AuthInfo = JSON.parse(sessionStorage.getItem('authInfo'));

        if(authInfo !== null && authInfo.islogin === true) {
            return true;
        } else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}