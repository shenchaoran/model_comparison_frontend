import { Component, OnInit } from '@angular/core';
import { CmpTaskService } from '../services';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
    selector: 'ogms-task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
    taskId: string;
    task: any;
    geojson: any;

    constructor(
        private service: CmpTaskService,
        private route: ActivatedRoute,
        private _notice: NzNotificationService,
        private title: DynamicTitleService
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.taskId = params['id'];
                this.service.findOne(this.taskId)
                    .subscribe(response => {
                        if (response.error) {
                            this._notice.warning('Warning:', 'Get task failed!');
                        }
                        else {
                            this.task = response.data;
                            this.title.setTitle(this.task.meta.name);
                            this.geojson = _.get(this.task, 'issue.spatial.geojson');
                        }
                    });
            });
    }

}
