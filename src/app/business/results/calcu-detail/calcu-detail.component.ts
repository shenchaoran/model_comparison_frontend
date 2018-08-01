import { Component, OnInit, HostListener } from "@angular/core";
import { CmpSlnService } from "../../comparison/comparison.module";
import { MSService } from '../../models/models.module';
import { CalcuTaskService } from '../services/calcu-task.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DocBaseComponent } from '@shared';
import { Observable, interval } from 'rxjs';
import { map, switchMap, filter, tap } from 'rxjs/operators';

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
            if(this.msRecord.progress < 100) {
                // this.fetchInterval();
            }
        }));
    }

    private fetchInterval() {
        const record$ = interval(2000).pipe(
            switchMap((v, i) => {
                return this.service.findOne(this.msRecord._id);
            }),
            map(response => {
                if(!response.error) {
                    return response.data;
                }
            })
        )

        const _subscription = record$.subscribe(doc => {
            this.msRecord = doc;
            this.msRecord.IO.mode = 'read';
            if(this.msRecord.progress === 100 || this.msRecord.progress === -1) {
                _subscription.unsubscribe();
            }
        });
        this._subscriptions.push(_subscription);
    }
}
