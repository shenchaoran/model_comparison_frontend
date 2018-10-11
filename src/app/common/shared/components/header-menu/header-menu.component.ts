import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Routes } from '@angular/router';
import { HeaderMenuService } from '@common/shared/components/header-menu/services/header-menu.service';

@Component({
  selector: 'ogms-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
    @Input() menuItems: Array<any>;
    subscriptions: Array<any> = new Array();
    constructor(private service: HeaderMenuService) {}

    ngOnInit() {
        
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
     
    }
}
