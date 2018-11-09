import { MenuClass } from './../../../../config/menu.config';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '@services';
import { forEach, replace } from 'lodash';

@Component({
  selector: 'ogms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    logined: boolean = false;
    q: string;

    get redirect() {
        var url = this.location.path();
        var index = url.indexOf('?');
        if (index !== -1)
            url = url.substring(0, index);
        return (url === '/user/sign-in' || url === '/user/sign-up') ? '' : url;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private userService: UserService,
        @Inject('HEADER_MENUS') public header_menus, 
        @Inject('USER_MENUS') public user_menus,
    ) {
        if(this.logined){
            this.replaceMenuConfig(this.user_menus,/:userName/g,this.userService.user.username);
        }
     }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['q']) {
                this.q = params['q'];
            }
        });

        this.userService.logined$.subscribe(logined => {
            this.logined = logined;
            this.replaceMenuConfig(this.user_menus,/:userName/g,this.userService.user.username);
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

    /**
     * 将 header_menus 或 user_menus 中的占位符替换
     * @param menus 参考 menu.config.ts 中 USER_MENUS。
     * @param regExp 正则 /\/:userName/g
     * @param replacement  
     */
    replaceMenuConfig(menus:MenuClass,regExp,replacement){
        menus.path = replace(menus.path,regExp,replacement);
        forEach(menus.children,item=>{
            item.path = replace(item.path,regExp,replacement);
        });
    }

}
