import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    CanActivateChild
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        let jwt = JSON.parse(localStorage.getItem('jwt'));
        console.log(jwt !== null, jwt.expires > Date.now());
        if (jwt !== null && jwt.expires > Date.now()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
