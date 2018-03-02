import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { CmpTaskService } from '../services';

@Component({
    selector: 'ogms-cmp-task-list',
    templateUrl: './cmp-task-list.component.html',
    styleUrls: ['./cmp-task-list.component.scss']
})
export class CmpTaskListComponent implements OnInit {
    tasks: any[];
    count: number;

    constructor(
        private route: ActivatedRoute,
        private service: CmpTaskService,
        private _notice: NzNotificationService,
    ) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.tasks = resolveData.tasks.docs;
            this.count = resolveData.tasks.count;
        });
    }

    search(filters) {
        this.service.findAll(filters)
            .subscribe(response => {
                if(response.error) {
                    this._notice.warning('Warning:', 'Get issues failed!');
                }
                else {
                    this.tasks = response.data.docs;
                    this.count = response.data.count;
                }
            });
    }
}
