import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'header-menu-layout',
    templateUrl: './header-menu-layout.component.html',
    styleUrls: ['./header-menu-layout.component.scss']
})
export class HeaderMenuLayoutComponent implements OnInit {
    // TODO optional show menu header
    showMenu: boolean = true;

    q: string;

    constructor(private route: ActivatedRoute) {
        this.showMenu = true;
    }

    ngOnInit() {
        postal.channel('MENU_CHANNEL').publish('menu.update');
    }

    search() {
        postal.channel('SEARCH_CHANNEL').publish('set.q', this.q);
    }
}
