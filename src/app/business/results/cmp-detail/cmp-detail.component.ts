import { Component, OnInit, HostListener } from "@angular/core";
import { CmpSlnService } from "../../comparison/comparison.module";
import { CmpTaskService } from '../services/cmp-task.service';
import { MSService } from '../../models/models.module';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@common/core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DocBaseComponent } from '@common/shared';

@Component({
  selector: 'ogms-cmp-detail',
  templateUrl: './cmp-detail.component.html',
  styleUrls: ['./cmp-detail.component.scss']
})
export class CmpDetailComponent extends DocBaseComponent implements OnInit {
    task;

    constructor(
        public route: ActivatedRoute,
        public service: CmpTaskService,
        public title: DynamicTitleService
    ) { 
        super(route, service, title);
    }

    ngOnInit() {
        super.ngOnInit();
        this._subscriptions.push(this.doc.subscribe(doc => {
            this.task = doc;
        }));
    }

}