import { Component, OnInit, HostListener } from "@angular/core";
import { CmpSlnService } from "../../comparison/comparison.module";
import { MSService } from '../../models/models.module';
import { CalcuTaskService } from '../services/calcu-task.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DocBaseComponent } from '@shared';
import { Observable, interval } from 'rxjs'
import { CalcuTaskState } from '@models'
import { map, switchMap, filter, tap, startWith } from 'rxjs/operators';

@Component({
    selector: 'ogms-calcu-detail',
    templateUrl: './calcu-detail.component.html',
    styleUrls: ['./calcu-detail.component.scss']
})
export class CalcuDetailComponent extends DocBaseComponent implements OnInit {
    _width = '520px';
    msRecord;

    constructor(
        public route: ActivatedRoute,
        public service: CalcuTaskService,
        public title: DynamicTitleService
    ) { 
        super(route, service, title);
    }

    ngOnInit() {
        super.ngOnInit();
        this._subscriptions.push(this.doc.subscribe(doc => {
            this.msRecord = doc;
            this.fetchInterval();
        }));
    }

    private fetchInterval() {
        const record$ = interval(3000).pipe(
            switchMap((v, i) => {
                return this.service.findOne(this.msRecord._id, false);
            }),
            map(response => {
                if(!response.error) {
                    return response.data;
                }
            })
        )

        const subscription = record$.subscribe(doc => {
            this.msRecord = doc;
            if(this.msRecord.state !== CalcuTaskState.RUNNING) {
                subscription.unsubscribe();
            }
        });
        this._subscriptions.push(subscription)
    }
}
