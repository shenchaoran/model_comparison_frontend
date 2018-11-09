import {
    Component,
    OnInit,
    HostListener,
    ViewChildren,
    QueryList,
    ElementRef,
    Renderer2
} from "@angular/core";
import { TaskService, ConversationService } from '@services';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { OgmsBaseComponent, } from '@shared';
import { Observable, interval } from 'rxjs'
import { map, switchMap, filter, tap, startWith } from 'rxjs/operators';
import { CmpState } from '@models';
import echarts from 'echarts';

@Component({
    selector: 'ogms-cmp-detail',
    templateUrl: './cmp-detail.component.html',
    styleUrls: ['./cmp-detail.component.scss'],
    providers: [ConversationService]
})
export class CmpDetailComponent extends OgmsBaseComponent implements OnInit {
    task;
    hadTriggeredConversation;
    @ViewChildren('echartDOM') echartDOM: QueryList<ElementRef>;

    constructor(
        public route: ActivatedRoute,
        public taskService: TaskService,
        private conversationService: ConversationService,
        public title: DynamicTitleService,
        public renderer2: Renderer2,
    ) {
        super();
    }

    ngOnInit() {
        this.taskService.findOne(this.route.snapshot.paramMap.get('id')).subscribe(res => {
            if(!res.error) {
                this.task = res.data;
                this.fetchInterval();
            }
        });
    }

    private fetchInterval() {
        const record$ = interval(3000).pipe(
            switchMap((v, i) => {
                return this.taskService.findOne(this.task._id, false);
            }),
            map(response => {
                if (!response.error) {
                    return response.data;
                }
            })
        )

        const subscription = record$.subscribe(doc => {
            this.task = doc;
            if (this.task.state !== CmpState.RUNNING) {
                subscription.unsubscribe();
                if (this.task.state === CmpState.FINISHED_SUCCEED ||
                    this.task.state === CmpState.FINISHED_FAILED)
                    this.buildChart();
            }
        });
        this._subscriptions.push(subscription)
    }

    private buildChart() {
        let i = 0;
        setTimeout(() => {
            this.task.cmpObjs.map(cmpObj => {
                cmpObj.methods.map((method) => {
                    if (method.id === '5b713f39a4857f1ba4be23ff') {
                        if (method.result.state === CmpState.FINISHED_SUCCEED) {
                            echarts
                                .init(this.echartDOM.toArray()[i].nativeElement)
                                .setOption(method.result);
                        }
                        i++;
                    }
                })
            })
        }, 10);
    }
    
    onTabChange(index) {
        if (index === 2 && !this.hadTriggeredConversation) {
            this.conversationService.findOneByWhere({
                pid: this.task._id
            }).subscribe(res => {
                if (!res.error) {
                    this.hadTriggeredConversation = true;
                    this.conversationService.import(
                        res.data.conversation,
                        res.data.users,
                        res.data.commentCount,
                        this.task.auth.userId,
                        this.task._id,
                        'task'
                    );
                }
            })
        }
    }
}