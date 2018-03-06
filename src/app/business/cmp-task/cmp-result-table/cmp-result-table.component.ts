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

    @Input() type: "swipe" | "default" = "default";
    @Input() source: {
        path: string,
        state: number
    };

    constructor(
        @Inject('BACKEND') private backend,
        private cmpTaskService: CmpTaskService
    ) { 
        this.hotId = uuidv1();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        if (this.source && this.source.path) {
            setTimeout(() => {
                this.cmpTaskService.getTable(this.source.path)
                    .subscribe(response => {
                        console.log('table request');
                        this.tableSrc = _
                            .chain(response)
                            .split('\n')
                            .map(row => {
                                if(row.trim() !== '') {
                                    return row.split(',');
                                }
                            })
                            .filter(item => item !== undefined)
                            .value();
                    })
            }, 0);
        }

    }

}
