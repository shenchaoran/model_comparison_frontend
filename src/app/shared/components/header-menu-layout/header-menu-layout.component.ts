import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HeaderMenuService } from '../header-menu/services/header-menu.service';
import { UserService } from '@services';

@Component({
    selector: 'header-menu-layout',
    templateUrl: './header-menu-layout.component.html',
    styleUrls: ['./header-menu-layout.component.scss']
})
export class HeaderMenuLayoutComponent implements OnInit, OnDestroy {
    logined: boolean = false;
    scrollbarCfg = {
        wheelSpeed: 1,
        swipeEasing: false
    };
    // TODO optional show menu header
    showMenu: boolean = true;
    navMenu: any[];
    userMenu: any[];
    signInMenu: any[] = [{
        data: {
            menu: {
                title: 'Sign in'
            }
        }
    }];
    signUpMenu: any[] = [{
        data: {
            menu: {
                title: 'Sign up'
            }
        }
    }];

    q: string;

    get redirect() {
        var url = this.location.path();
        var index = url.indexOf('?');
        if(index !== -1)
            url = url.substring(0, index);
        return (url === '/user/sign-in' || url === '/user/sign-up') ? '': url;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private userService: UserService,
        private menuService: HeaderMenuService
    ) {
        this.showMenu = true;
    }

    ngOnDestroy() { }

    ngOnInit() {
        this.navMenu = this.menuService.getMenus('HEADER_MENUS');
        this.userMenu = this.menuService.getMenus('USER_MENUS');

        this.route.queryParams
            .subscribe((params: Params) => {
                if (params['q']) {
                    this.q = params['q'];
                }
            });

        this.userService.logined$.subscribe(logined => {
            this.logined = logined;
        });
    }

    search() {
        // TODO: 通过 url 传参数有长度限制
        this.router.navigate(['/search'], {
            queryParams: {
                q: this.q
            }
        });
    }

    login() {
        this.router.navigate(['/user/sign-in'], {
            queryParams: {
                redirect: this.redirect
            }
        });
    }

    register() {
        this.router.navigate(['/user/sign-up'], {
            queryParams: {
                redirect: this.redirect
            }
        });
    }
}
