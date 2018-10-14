import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SlnService } from "../../comparison";
import { TaskService } from '../../services/task.service';
import { MSRService } from '../../services/msr.service';
import { MSService } from '../../services';
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@common/core/services/dynamic-title.service';

@Component({
  selector: 'ogms-calcu-list',
  templateUrl: './calcu-list.component.html',
  styleUrls: ['./calcu-list.component.scss']
})
export class CalcuListComponent {
    constructor(
        public route: ActivatedRoute,
        public service: MSRService,
        public title: DynamicTitleService
    ) { }
}
