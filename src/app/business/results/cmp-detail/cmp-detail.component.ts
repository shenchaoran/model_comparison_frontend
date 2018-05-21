import { Component, OnInit, HostListener } from "@angular/core";
import { CmpSlnService } from "../../comparison/comparison.module";
import { CmpTaskService } from '../services/cmp-task.service';
import { MSService } from '../../models/models.module';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DocBaseComponent } from '@shared';

@Component({
  selector: 'ogms-cmp-detail',
  templateUrl: './cmp-detail.component.html',
  styleUrls: ['./cmp-detail.component.scss']
})
export class CmpDetailComponent extends DocBaseComponent implements OnInit {
    task;

    constructor(
        protected route: ActivatedRoute,
        protected service: CmpTaskService,
        protected _notice: NzNotificationService,
        protected title: DynamicTitleService
    ) { 
        super(route, service, _notice, title);
    }

    ngOnInit() {
        super.ngOnInit();
        this._subscriptions.push(this.doc.subscribe(doc => {
            this.task = doc;
        }));
    }

}