import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SolutionService } from '../../services/sln.service';
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@common/core/services/dynamic-title.service';

@Component({
    selector: 'ogms-solution-list',
    templateUrl: './solution-list.component.html',
    styleUrls: ['./solution-list.component.scss']
})
export class SolutionListComponent {
    createBtn = {
        display: true,
        url: '/comparison/solutions/create'
    }

    constructor(
        public service: SolutionService,
        public route: ActivatedRoute,
        public title: DynamicTitleService
    ) { 
        // super(route, service, title);
    }
}
