// TODO 占内存太大
// 怎么在 tab 切换过来时在请求，切出去时 destroy

import { Component, OnInit, Input, Output, Inject, AfterViewInit } from '@angular/core';
import { CmpTaskService } from '../services/cmp-task.service';
import * as uuidv1 from 'uuid/v1';

@Component({
    selector: 'ogms-cmp-result-table',
    templateUrl: './cmp-result-table.component.html',
    styleUrls: ['./cmp-result-table.component.scss']
})
export class CmpResultTableComponent implements OnInit {
    hotId;
    tableSrc: any;
    colHeaders: any;

    @Input() source: any;

    constructor(
        private cmpTaskService: CmpTaskService
    ) { 
        this.hotId = uuidv1();
    }

    ngOnInit() {
        // TODO headers
        this.colHeaders = ['Name', 'min', 'max', 'mean', 'stdDev', 'sum'];
    }

    ngAfterViewInit() {
        if (this.source) {
            setTimeout(() => {
                this.tableSrc = this.source;
                // this.cmpTaskService.getTable(this.source.path)
                //     .subscribe(response => {
                //         console.log('table request');
                //         this.tableSrc = _
                //             .chain(response)
                //             .split('\n')
                //             .map(row => {
                //                 if(row.trim() !== '') {
                //                     return row.split(',');
                //                 }
                //             })
                //             .filter(item => item !== undefined)
                //             .value();
                //     })
            }, 0);
        }

    }

}
