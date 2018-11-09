import {
    Component,
    OnInit,
    HostListener,
    ViewChildren,
    QueryList,
    ElementRef,
    Renderer2
} from "@angular/core";
import { TaskService, ConversationService, UserService } from '@services';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { OgmsBaseComponent, } from '@shared';
import { Observable, interval } from 'rxjs'
import { map, switchMap, filter, tap, startWith } from 'rxjs/operators';
import { CmpState } from '@models';
import echarts from 'echarts';
import { findIndex, get } from 'lodash';

@Component({
    selector: 'ogms-cmp-detail',
    templateUrl: './cmp-detail.component.html',
    styleUrls: ['./cmp-detail.component.scss'],
    providers: [ConversationService]
})
export class CmpDetailComponent extends OgmsBaseComponent implements OnInit {
    taskId;
    task;
    ptMSs;
    solution;
    hadTriggeredConversation;
    echartDOMIndex = 0;
    @ViewChildren('echartDOM') echartDOM: QueryList<ElementRef>;

    get user() { return this.userService.user; }
    get users() { return this.conversationService.users; }
    get couldEdit() { return this.user && this.solution && this.solution.auth.userId === this.user._id; }
    get conversation() { return this.conversationService.conversation; }
    get includeUser() { return findIndex(get(this, 'solution.subscribed_uids'), v => v === this.user._id) !== -1; }
    constructor(
        public route: ActivatedRoute,
        public taskService: TaskService,
        public userService: UserService,
        private conversationService: ConversationService,
        public title: DynamicTitleService,
        public renderer2: Renderer2,
    ) {
        super();
    }

    ngOnInit() {
        this.taskId = this.route.snapshot.paramMap.get('id')
        this.taskService.findOne(this.taskId).subscribe(res => {
            if (!res.error) {
                this.task = res.data.task;
                this.ptMSs = res.data.ptMSs;
                this.solution = res.data.solution;

                this.fetchInterval();
            }
        });
    }

    private fetchInterval() {
        const record$ = interval(3000).pipe(
            switchMap((v, i) => {
                return this.taskService.findOne(this.taskId, false);
            })
        )

        const subscription = record$.subscribe(res => {
            this.task = res.data.task;
            this.ptMSs = res.data.ptMSs;
            this.solution = res.data.solution;

            if (this.task.state !== CmpState.RUNNING) {
                subscription.unsubscribe();
                if (this.task.state === CmpState.FINISHED_SUCCEED ||
                    this.task.state === CmpState.FINISHED_FAILED)
                    this.buildChart(0);
            }
        });
        this._subscriptions.push(subscription)
    }

    private buildChart(i) {
        setTimeout(() => {
            let cmpObj = this.task.cmpObjs[i]
            cmpObj.methods.map((method) => {
                if (method.id === '5b713f39a4857f1ba4be23ff') {
                    if (method.result.state === CmpState.FINISHED_SUCCEED) {
                        echarts
                            .init(this.echartDOM.toArray()[i].nativeElement)
                            .setOption(method.result);
                    }
                    this.echartDOMIndex++;
                }
            })
        }, 10);
    }

    onTabChange(index) {
        if (index === this.task.cmpObjs.length && !this.hadTriggeredConversation) {
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
        else {
            this.buildChart(index);
        }
    }

    onSubscribeToggle() {
        let ac = this.includeUser ? 'unsubscribe' : 'subscribe';
        this.userService.toggleSubscribe('solution', ac, this.solution._id).subscribe(res => {
            if (!res.error) {
                let i = this.solution.subscribed_uids.findIndex(v => v === this.user._id);
                if (ac === 'subscribe') {
                    i === -1 && this.solution.subscribed_uids.push(this.user._id);
                }
                else if (ac === 'unsubscribe') {
                    i !== -1 && this.solution.subscribed_uids.splice(i, 1);
                }
            }
        });
    }
}