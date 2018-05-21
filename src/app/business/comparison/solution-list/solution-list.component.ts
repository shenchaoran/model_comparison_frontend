import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CmpSlnService } from '../services/cmp-sln.service';
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import { ListBaseComponent } from '@common/shared';

@Component({
    selector: 'ogms-solution-list',
    templateUrl: './solution-list.component.html',
    styleUrls: ['./solution-list.component.scss']
})
export class SolutionListComponent extends ListBaseComponent implements OnInit {
    withCreateBtn = true;

    constructor(
        protected route: ActivatedRoute,
        protected service: CmpSlnService,
        protected _notice: NzNotificationService,
        protected title: DynamicTitleService
    ) { 
        super(route, service, _notice, title);
    }
}
