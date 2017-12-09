import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { CmpTaskService } from '../services/cmp-task.service';

@Component({
    selector: 'ogms-cmp-task',
    templateUrl: './cmp-task.component.html',
    styleUrls: ['./cmp-task.component.scss']
})
export class CmpTaskComponent implements OnInit {
    tabs: Array<{
        id: string,
        name: string,
        data: any
    }>;
    constructor(
        private service: CmpTaskService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.tabs = resolveData.taskTabTree;
        });
    }
}
