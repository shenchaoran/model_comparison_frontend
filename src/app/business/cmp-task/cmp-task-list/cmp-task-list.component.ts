import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
    selector: 'ogms-cmp-task-list',
    templateUrl: './cmp-task-list.component.html',
    styleUrls: ['./cmp-task-list.component.scss']
})
export class CmpTaskListComponent implements OnInit {
    tasks: any[];

    constructor(
        private route: ActivatedRoute,
        private title: DynamicTitleService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.tasks = resolveData.tasks;
        });
    }
}
