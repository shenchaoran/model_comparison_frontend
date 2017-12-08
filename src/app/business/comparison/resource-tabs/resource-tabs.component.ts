import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ogms-resource-tabs',
    templateUrl: './resource-tabs.component.html',
    styleUrls: ['./resource-tabs.component.scss']
})
export class ResourceTabsComponent implements OnInit {
    tabs: Array<{
        id: string,
        name: string,
        data: any
    }>;
    constructor() {}

    ngOnInit() {}
}
