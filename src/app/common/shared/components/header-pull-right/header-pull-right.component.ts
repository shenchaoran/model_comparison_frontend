import { Component, OnInit } from '@angular/core';
import { LoginService } from '@common/feature/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ogms-header-pull-right',
    templateUrl: './header-pull-right.component.html',
    styleUrls: ['./header-pull-right.component.scss']
})
export class HeaderPullRightComponent implements OnInit {
    hasLogin: boolean;
    
    constructor(
        private loginService: LoginService,
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

        this.hasLogin = this.loginService.hasLogin();
    }

    login() {
        this.router.navigate(['/login'], {
            queryParams: {
                redirect: (window as any).location.hash
            }
        });
    }

    register() {
        this.router.navigate(['/join'], {
            queryParams: {
                redirect: (window as any).location.hash
            }
        });
    }
}
