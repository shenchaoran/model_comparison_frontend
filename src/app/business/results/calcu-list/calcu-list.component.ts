import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CmpSlnService } from "../../comparison/comparison.module";
import { CmpTaskService } from '../services/cmp-task.service';
import { CalcuTaskService } from '../services/calcu-task.service';
import { MSService } from '../../models/models.module';
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import { ListBaseComponent } from '@common/shared';

@Component({
  selector: 'ogms-calcu-list',
  templateUrl: './calcu-list.component.html',
  styleUrls: ['./calcu-list.component.scss']
})
export class CalcuListComponent extends ListBaseComponent implements OnInit {
    withCreateBtn = false;

    constructor(
        public route: ActivatedRoute,
        public service: CalcuTaskService,
//private _notice: NzNotificationService,
        public title: DynamicTitleService
    ) { 
        super(route, service, title);
    }
}
