import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MSService } from "../services/geo-models.service";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
    selector: 'ogms-geo-model-list',
    templateUrl: './geo-model-list.component.html',
    styleUrls: ['./geo-model-list.component.scss']
})
export class GeoModelListComponent {
    
    constructor(
        public route: ActivatedRoute,
        public service: MSService,
        public title: DynamicTitleService
    ) { }
}
