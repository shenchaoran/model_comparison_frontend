import { Component, OnInit, HostListener, OnDestroy } from "@angular/core";
import { CmpSlnService } from "../services/cmp-sln.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DocBaseComponent } from '@shared';

@Component({
    selector: 'ogms-solution-detail',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss']
})
export class SolutionDetailComponent extends DocBaseComponent implements OnInit {
    sln;
    geojson;

    constructor(
        public route: ActivatedRoute,
        public service: CmpSlnService,
//private _notice: NzNotificationService,
        public title: DynamicTitleService
    ) { 
        super(route, service, title);
    }

    ngOnInit() {
        super.ngOnInit();
        this._subscriptions.push(this.doc.subscribe(doc => {
            this.sln = doc;
            this.geojson = _.get(this.sln, 'issue.spatial.geojson');
        }));
    }
}
