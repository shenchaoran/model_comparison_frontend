import { Component, OnInit, HostListener } from "@angular/core";
import { CmpSlnService } from "../services/cmp-sln.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@common/core/services/dynamic-title.service";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { DocBaseComponent } from '@common/shared';

@Component({
  selector: 'ogms-task-config',
  templateUrl: './task-config.component.html',
  styleUrls: ['./task-config.component.scss']
})
export class TaskConfigComponent extends DocBaseComponent implements OnInit {
    sln;

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
        this.doc.subscribe(doc => {
            this.sln = doc;
        });
    }

}