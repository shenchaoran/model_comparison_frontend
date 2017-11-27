import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header-pull-right',
    templateUrl: './header-pull-right.component.html',
    styleUrls: ['./header-pull-right.component.scss']
})
export class HeaderPullRightComponent implements OnInit {
    hasLogin: boolean;
    
    constructor() {
        this.hasLogin = false;
    }

    ngOnInit() {
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
    }
}
