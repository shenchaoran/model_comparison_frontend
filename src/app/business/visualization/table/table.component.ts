import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ogms-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    hotId;
    @Input() height = '350';
    @Input() width = '500';
    @Input() tableSrc;
    
    constructor() {}

    ngOnInit() {}

    adjustTableH() {

    }
}
