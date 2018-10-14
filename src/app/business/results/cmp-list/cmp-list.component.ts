import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SlnService } from "../../comparison";
import { TaskService } from '../../services/task.service';
import { MSService } from '../../services';
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@common/core/services/dynamic-title.service';

@Component({
  selector: 'ogms-cmp-list',
  templateUrl: './cmp-list.component.html',
  styleUrls: ['./cmp-list.component.scss']
})
export class CmpListComponent {
    constructor(
        public route: ActivatedRoute,
        public service: TaskService,
        public title: DynamicTitleService
    ) { }
}