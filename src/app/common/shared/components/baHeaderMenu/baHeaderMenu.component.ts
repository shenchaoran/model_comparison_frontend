import { Component, OnInit, OnDestroy } from '@angular/core';

import { BaHeaderMenuService } from './baHeaderMenu.service';
import { BaMenuService } from '../baMenu/services/baMenu.service';
import { HeaderMenuMetaInfo } from './baHeaderMenu';

@Component({
    selector: 'app-baHeaderMenu',
    templateUrl: './baHeaderMenu.component.html',
    styleUrls: ['./baHeaderMenu.component.scss'],
    providers: [BaMenuService]
})
export class BaHeaderMenuComponent implements OnInit, OnDestroy {
    subscriptions: Array<any> = new Array();
    menuItems: Array<HeaderMenuMetaInfo>;
    constructor(private baMenuService: BaMenuService) {}

    ngOnInit() {
        let subscription = this.baMenuService.headerMenuItems.subscribe(
            this.getMenuItems.bind(this)
        );
        this.subscriptions.push(subscription);
    }

    public getMenuItems(menuItems) {
        this.menuItems = menuItems;
        this.selectMenuAndNotify();
    }

    public selectMenuAndNotify() {}

    ngAfterViewInit() {
        jQuery('#nav-menu').css('line-height', '50px');
        
    }

    ngOnDestroy() {
        _.forEach(this.subscriptions, topic => {
            //   postal.unsubscribe(topic);
            topic.unsubscribe();
        });
    }
}
