import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'header-menu-layout',
    templateUrl: './header-menu-layout.component.html',
    styleUrls: ['./header-menu-layout.component.scss']
})
export class HeaderMenuLayoutComponent implements OnInit, OnDestroy {
    // TODO optional show menu header
    showMenu: boolean = true;

    q: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.showMenu = true;
    }

    ngOnDestroy() {
        console.log('destroy');
    }

    ngOnInit() {
        postal.channel('MENU_CHANNEL').publish('menu.update');
        this.route.queryParams
            .subscribe((params: Params) => {
                if(params['q']) {
                    this.q = params['q'];
                }
            })
    }

    search() {
        // TODO: 通过 url 传参数有长度限制
        this.router.navigate(['/search'], {
            queryParams: {
                q: this.q
            }
        });
    }
}
