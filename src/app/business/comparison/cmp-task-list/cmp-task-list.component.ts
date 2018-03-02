import { Component, OnInit } from '@angular/core';
import { CmpTaskService } from '../services/cmp-task.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'ogms-cmp-task-list',
    templateUrl: './cmp-task-list.component.html',
    styleUrls: ['./cmp-task-list.component.scss']
})
export class CmpTaskListComponent implements OnInit {
    tasks: any[];

    constructor(
        private taskService: CmpTaskService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.tasks = resolveData.tasks;
        });
    }
}
