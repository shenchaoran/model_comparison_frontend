import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as uuidv1 from 'uuid/v1';

@Component({
    selector: 'ogms-statistic-result',
    templateUrl: './statistic-result.component.html',
    styleUrls: ['./statistic-result.component.scss']
})
export class StatisticResultComponent implements OnInit, AfterViewInit {
    @Input() data: any;
    @ViewChild('gridTable') gridTableRef: ElementRef;
    targetId
    constructor() {
        this.targetId = uuidv1();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }

    // buildTable() {
    //     let dom = _.get(this, 'gridTableRef.nativeElement')
    //     if (!dom)
    //         return;
    //     $(dom).jexcel({
    //         contextMenu: () => {
    //             event.stopPropagation();
    //             event.preventDefault();
    //             return false;
    //         },
    //         colHeaders: this.colHeaders,
    //         colWidths: this.colWidths,
    //         columns: this.columns,
    //         data: this.data,
    //         allowInsertColumn: false,
    //         allowDeleteColumn: false,
    //         allowInsertRow: false,
    //         allowDeleteRow: false,
    //         minSpareRows: 0,
    //         editable: false,
    //         onchange: (instance, cell, value) => {

    //         },
    //         onbeforechange: (instance, cell, value) => {

    //         },
    //     });
    // }
}
