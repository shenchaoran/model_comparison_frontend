import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ogms-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    hotId;
    _tableSrc;
    @Input() height = '350';
    @Input() width = '500';
    @Input() set tableSrc(v) {
        console.log(v.length);
        this._tableSrc = v;
    }
    
    constructor() {
        console.log('in table component');
    }

    ngOnInit() {}

    adjustTableH() {

    }
}
