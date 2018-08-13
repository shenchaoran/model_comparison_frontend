import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CmpSlnService } from '../services/cmp-sln.service';
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
    selector: 'ogms-solution-list',
    templateUrl: './solution-list.component.html',
    styleUrls: ['./solution-list.component.scss']
})
export class SolutionListComponent {
    constructor(
        public service: CmpSlnService,
        public route: ActivatedRoute,
        public title: DynamicTitleService
    ) { 
        // super(route, service, title);
    }
}
