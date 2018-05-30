import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MSService } from "../services/geo-models.service";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import { ListBaseService, ListBaseComponent } from '@shared';

@Component({
    selector: 'ogms-geo-model-list',
    templateUrl: './geo-model-list.component.html',
    styleUrls: ['./geo-model-list.component.scss']
})
export class GeoModelListComponent extends ListBaseComponent implements OnInit {
    
    constructor(
        public route: ActivatedRoute,
        public service: MSService,
//private _notice: NzNotificationService,
        public title: DynamicTitleService
    ) { 
        super(route, service, title);
    }
}
