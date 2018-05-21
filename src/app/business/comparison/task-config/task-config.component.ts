import { Component, OnInit, HostListener } from "@angular/core";
import { CmpSlnService } from "../services/cmp-sln.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DocBaseComponent } from '@shared';

@Component({
  selector: 'ogms-task-config',
  templateUrl: './task-config.component.html',
  styleUrls: ['./task-config.component.scss']
})
export class TaskConfigComponent extends DocBaseComponent implements OnInit {
    sln;

    constructor(
        protected route: ActivatedRoute,
        protected service: CmpSlnService,
        protected _notice: NzNotificationService,
        protected title: DynamicTitleService
    ) { 
        super(route, service, _notice, title);
    }

    ngOnInit() {
        super.ngOnInit();
        this.doc.subscribe(doc => {
            this.sln = doc;
        });
    }

}