import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import { SubMenu } from './sub-menu';

@Component({
    selector: 'njgis-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, AfterViewInit {
    @Input() menuCfg: Array<SubMenu>;
    @Input() id: string;
    constructor() {}

    ngOnInit() {}

    publishClick(e, cb, params) {
        const postalInfo = cb.split('#');
        postal.channel('MENU_CHANNEL').publish('menu.hide');
        postal.channel(postalInfo[0]).publish(postalInfo[1], params);
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
    }

    onClickMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
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
}
