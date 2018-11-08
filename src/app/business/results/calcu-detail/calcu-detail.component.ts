import { Component, OnInit, HostListener } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { OgmsBaseComponent } from '@shared';
import { CalcuTaskState, Conversation } from '@models'
import { Observable, interval } from 'rxjs'
import { map, switchMap, filter, tap, startWith } from 'rxjs/operators';
import { ConversationService, MSRService, MSService } from "@services";

@Component({
    selector: 'ogms-calcu-detail',
    templateUrl: './calcu-detail.component.html',
    styleUrls: ['./calcu-detail.component.scss']
})
export class CalcuDetailComponent extends OgmsBaseComponent implements OnInit {
    msRecord;

    get users() { return this.conversationService.users; }
    get conversation(): Conversation { return this.conversationService.conversation; }
    constructor(
        public route: ActivatedRoute,
        public msService: MSService,
        public msrService: MSRService,
        public conversationService: ConversationService,
        public title: DynamicTitleService,
    ) { 
        super();
    }

    ngOnInit() {
        this.msrService.findOne(this.route.snapshot.paramMap.get('id')).subscribe(res => {
            if(!res.error) {
                this.msRecord = res.data.msr;
                this.conversationService.import(
                    res.data.conversation,
                    res.data.users,
                    res.data.commentCount,
                    res.data.msr.auth.userId,
                    res.data.msr._id,
                    'calcuTask',
                );
                this.fetchInterval();
            }
        });
    }

    private fetchInterval() {
        const record$ = interval(3000).pipe(
            switchMap((v, i) => {
                return this.msrService.findOne(this.msRecord._id, false);
            })
        )

        const subscription = record$.subscribe(res => {
            if(!res.error) {
                this.msRecord = res.data.msr;
                if(this.msRecord.state === 'COULD_START' || this.msRecord.state !== CalcuTaskState.RUNNING) {
                    subscription.unsubscribe();
                }
            }
            else {
                subscription.unsubscribe();
            }
        });
        this._subscriptions.push(subscription)
    }

    onStartClick() {
        this.msService.invoke(this.msRecord.msId, this.msRecord).subscribe(res => {
            if(!res.error) {
                this.fetchInterval();
            }
        });
    }
}
