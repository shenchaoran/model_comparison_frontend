/**
 * 笨组件：事件和属性都由外部控制
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ogms-resource-tabs',
    templateUrl: './resource-tabs.component.html',
    styleUrls: ['./resource-tabs.component.scss']
})
export class ResourceTabsComponent implements OnInit {
    @Input() tabs: Array<{
        id: string,
        name: string,
        data: any
    }>;
    constructor() {}

    ngOnInit() {}
}
