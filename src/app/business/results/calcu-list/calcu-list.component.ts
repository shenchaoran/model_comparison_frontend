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
    searchFilters: {
        q?: string,
        pageSize?: number,
        pageNum?: number,
        owner?: string,
        organization?: string,
        sort?: string,
        [key: string]: any
    } = {
        pageSize: 10,
        pageNum: 1
    };

    constructor(
        public route: ActivatedRoute,
        public service: CalcuTaskService,
//private _notice: NzNotificationService,
        public title: DynamicTitleService
    ) { 
        super(route, service, title);
    }
}
