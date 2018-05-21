import { Component, OnInit, HostListener } from "@angular/core";
import { CmpSlnService } from "../../comparison/comparison.module";
import { MSService } from '../../models/models.module';
import { CalcuTaskService } from '../services/calcu-task.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DocBaseComponent } from '@shared';

@Component({
    selector: 'ogms-calcu-detail',
    templateUrl: './calcu-detail.component.html',
    styleUrls: ['./calcu-detail.component.scss']
})
export class CalcuDetailComponent extends DocBaseComponent implements OnInit {
    _width = '520px';
    msRecord;

    constructor(
        protected route: ActivatedRoute,
        protected service: CalcuTaskService,
        protected _notice: NzNotificationService,
        protected title: DynamicTitleService
    ) { 
        super(route, service, _notice, title);
    }

    ngOnInit() {
        super.ngOnInit();
        this._subscriptions.push(this.doc.subscribe(doc => {
            this.msRecord = doc;
            this.msRecord.IO.mode = 'read';
        }));
    }

}
