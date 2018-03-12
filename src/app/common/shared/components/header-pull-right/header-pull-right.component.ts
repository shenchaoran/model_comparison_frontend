import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ogms-header-pull-right',
    templateUrl: './header-pull-right.component.html',
    styleUrls: ['./header-pull-right.component.scss']
})
export class HeaderPullRightComponent implements OnInit {
    hasLogin: boolean;
    
    constructor() {
        this.hasLogin = false;
    }

    ngOnInit() {
        postal.channel('MENU')
            .subscribe('logout', () => {
                this.hasLogin = false;
            })

        const jwtStr = localStorage.getItem('jwt');
        if (jwtStr !== undefined) {
            const jwt = JSON.parse(jwtStr);
            if (jwt !== null && jwt.expires > Date.now()) {
                // token is available
                const token = jwt.token;
                this.hasLogin = true;
                
            }
            else {
                this.hasLogin = false;
            }
        }
        else {
            this.hasLogin = false;
        }
    }
}
