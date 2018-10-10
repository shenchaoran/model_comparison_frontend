import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../business/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ogms-header-pull-right',
    templateUrl: './header-pull-right.component.html',
    styleUrls: ['./header-pull-right.component.scss']
})
export class HeaderPullRightComponent implements OnInit {
    hasLogin: boolean;
    
    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.hasLogin = false;
    }

    ngOnInit() {
        postal.channel('MENU')
            .subscribe('logout', () => {
                this.hasLogin = false;
            });

        this.hasLogin = this.userService.hadLogin();
    }

    login() {
        this.router.navigate(['/user/sign-in'], {
            queryParams: {
                redirect: (window as any).location.hash
            }
        });
    }

    register() {
        this.router.navigate(['/user/sign-up'], {
            queryParams: {
                redirect: (window as any).location.hash
            }
        });
    }
}
