import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
    selector: 'ogms-data-tabs',
    templateUrl: './data-tabs.component.html',
    styleUrls: ['./data-tabs.component.scss']
})
export class DataTabsComponent implements OnInit {
    tabs: Array<any> = [
        {
            name: 'Std Testify Set'
        },
        {
            name: 'Yours Data Set'
        }
    ]

    constructor(private service: DataService) {}

    ngOnInit() {}
}
