import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Routes } from '@angular/router';
import { HeaderMenuService } from './services/header-menu.service';

@Component({
  selector: 'ogms-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
    @Input() 
    set type(v) {
        this.menuItems = <Routes>(this.service.getMenus(v));
    };
    subscriptions: Array<any> = new Array();
    menuItems: Array<any>;
    constructor(private service: HeaderMenuService) {}

    ngOnInit() {
        
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
     
    }
}
