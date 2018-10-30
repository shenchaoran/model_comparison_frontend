import { Component, OnInit, HostListener } from "@angular/core";
import { MSRService } from '../../services/msr.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { OgmsBaseComponent } from '@shared';
import { CalcuTaskState } from '@models'
import { Observable, interval } from 'rxjs'
import { map, switchMap, filter, tap, startWith } from 'rxjs/operators';

@Component({
    selector: 'ogms-calcu-detail',
    templateUrl: './calcu-detail.component.html',
    styleUrls: ['./calcu-detail.component.scss']
})
export class CalcuDetailComponent extends OgmsBaseComponent implements OnInit {
    _width = '520px';
    msRecord;

    constructor(
        public route: ActivatedRoute,
        public msrService: MSRService,
        public title: DynamicTitleService
    ) { 
        super();
    }

    ngOnInit() {
        this.msrService.findOne(this.route.snapshot.paramMap.get('id')).subscribe(res => {
            if(!res.error) {
                this.msRecord = res.data;
                this.fetchInterval();
            }
        });
    }

    private fetchInterval() {
        const record$ = interval(3000).pipe(
            switchMap((v, i) => {
                return this.msrService.findOne(this.msRecord._id, false);
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
