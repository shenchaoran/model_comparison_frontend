import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { HeaderMenuService } from './baHeaderMenu.service';
import { BaMenuService } from '../baMenu/services/baMenu.service';
import { HeaderMenuMetaInfo } from './baHeaderMenu';

@Component({
    selector: 'ogms-baHeaderMenu',
    templateUrl: './baHeaderMenu.component.html',
    styleUrls: ['./baHeaderMenu.component.scss'],
    providers: [BaMenuService]
})
export class BaHeaderMenuComponent implements OnInit, OnDestroy {
    @Input() 
    set type(v) {
        this.menuItems = <Routes>(this.service.getMenus(v));
    };
    subscriptions: Array<any> = new Array();
    menuItems: Array<any>;
    constructor(private service: HeaderMenuService) {}

    ngOnInit() {
        
    }

    ngAfterViewInit() {
        // jQuery('#nav-menu').css('line-height', '50px');
    }

    ngOnDestroy() {
     
    }
}
