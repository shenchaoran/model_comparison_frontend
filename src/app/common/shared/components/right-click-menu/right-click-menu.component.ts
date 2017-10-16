import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import { SubMenu } from './sub-menu';

@Component({
    selector: 'app-right-click-menu',
    templateUrl: './right-click-menu.component.html',
    styleUrls: ['./right-click-menu.component.scss']
})
export class RightClickMenuComponent implements OnInit, AfterViewInit {
    @Input() menuCfg: Array<SubMenu>;
    @Input() id: string;
    constructor() {}

    ngOnInit() {}

    publishClick(cb) {
        const postalInfo = cb.split('#');
        postal.channel(postalInfo[0]).publish(postalInfo[1], {});
    }

    ngAfterViewInit() {
        // jQuery(`#${this.id} li div`).css({
        //     'height': '30px',
        //     'line-height': '30px'
        // });
        // jQuery(`#${this.id} .ant-menu-item`).css({
        //     'height': '30px',
        //     'line-height': '30px'
        // });
    }

    hideContextMenu(e){
        e.stopPropagation();
        e.preventDefault();
        postal.channel('MENU_CHANNEL').publish('menu.hide');
    }
}
