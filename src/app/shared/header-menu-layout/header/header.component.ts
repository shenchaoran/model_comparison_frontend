import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '@services';

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
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
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
