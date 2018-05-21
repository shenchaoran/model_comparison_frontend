import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CmpSlnService } from "../../comparison/comparison.module";
import { CmpTaskService } from '../services/cmp-task.service';
import { MSService } from '../../models/models.module';
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import { ListBaseComponent } from '@common/shared';

@Component({
  selector: 'ogms-cmp-list',
  templateUrl: './cmp-list.component.html',
  styleUrls: ['./cmp-list.component.scss']
})
export class CmpListComponent extends ListBaseComponent implements OnInit {
    withCreateBtn = false;

    constructor(
        protected route: ActivatedRoute,
        protected service: CmpTaskService,
        protected _notice: NzNotificationService,
        protected title: DynamicTitleService
    ) { 
        super(route, service, _notice, title);
    }
}