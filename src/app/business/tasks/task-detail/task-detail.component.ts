import {
    Component,
    OnInit,
    HostListener,
    ViewChildren,
    QueryList,
    ElementRef,
    Renderer2,
    Inject,
} from "@angular/core";
import { TaskService, ConversationService, UserService } from '@services';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { OgmsBaseComponent, } from '@shared';
import { Observable, interval } from 'rxjs'
import { map, switchMap, filter, tap, startWith } from 'rxjs/operators';
import { OGMSState } from '@models';
import echarts from 'echarts';
import { findIndex, get } from 'lodash';

@Component({
    selector: 'ogms-task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss'],
    providers: [ConversationService]
})
export class CmpDetailComponent extends OgmsBaseComponent implements OnInit {
    taskId;
    task;
    calcuTasks;
    ptMSs;
    solution;
    metrics;
    hadTriggeredConversation;
    spatialType: 'site' | 'region';
    @ViewChildren('echartDOM') echartDOM: QueryList<ElementRef>;
    chartRecord = {};
    currentChart = 0;

    get user() { return this.userService.user; }
    get users() { return this.conversationService.users; }
    get couldEdit() { return this.user && this.task && this.task.auth.userId === this.user._id; }
    get conversation() { return this.conversationService.conversation; }
    get includeUser() { return findIndex(get(this, 'solution.subscribed_uids'), v => v === this.user._id) !== -1; }
    constructor(
        public route: ActivatedRoute,
        public taskService: TaskService,
        public userService: UserService,
        public conversationService: ConversationService,
        public title: DynamicTitleService,
        public renderer2: Renderer2,
        public router: Router,
        @Inject('API') public api,
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
                this.calcuTasks = res.data.calcuTasks;
                this.metrics = res.data.metrics;

                _.map(this.solution.cmpMethods, method => {
                    if(method.name === 'Sub-region bias contour map' || method.name === 'Heat map' || method.name === 'Sub-region line chart') {
                        this.spatialType = 'region';
                    }
                    else if(method.name === "table series visualization" || method.name === "Line chart") {
                        this.spatialType = 'site';
                    }
                })

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

            if (this.task.state !== OGMSState.RUNNING) {
                subscription.unsubscribe();
                if (this.task.state === OGMSState.FINISHED_SUCCEED ||
                    this.task.state === OGMSState.FINISHED_FAILED)
                    this.buildChart();
            }
        });
        this._subscriptions.push(subscription)
    }

    private buildChart() {
        setTimeout(() => {
            let refactored = this.task.refactored[this.currentChart]
            _.map(refactored.methods, (method, j) => {
                if (
                    method.name === 'Sub-region line chart' ||
                    method.name === 'Heat map' ||
                    method.name === 'table series visualization' ||
                    method.name === 'Line chart'
                ) {
                    if (_.get(method, 'result.state') === OGMSState.FINISHED_SUCCEED) {
                        // console.log(this.echartDOM.toArray())
                        let echartDOM = _.find(this.echartDOM.toArray(), echartDOM => echartDOM.nativeElement.id === `${refactored.metricName}-${method.id}`)
                        if(echartDOM) {
                            if(method.name === 'Sub-region line chart') {
                                let height = 200 * Math.ceil(this.task.regions.length/4) + 'px'
                                this.renderer2.setStyle(echartDOM.nativeElement, 'height', height)
                            }
                            else if(method.name === 'Heat map') {
                                let height = 100 * _.get(method, 'result.grid.length') + 'px'
                                this.renderer2.setStyle(echartDOM.nativeElement, 'height', height)
                            }
                            echarts
                                .init(echartDOM.nativeElement)
                                .setOption(method.result);
                            this.chartRecord[this.currentChart] = true;
                        }
                    }
                }
            })
        }, 10);
    }

    onTabChange(index) {
        if (index === this.task.refactored.length+1 && !this.hadTriggeredConversation) {
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
        else if(index> 0 && index< this.task.refactored.length+1) {
            this.currentChart = index - 1
            if(this.chartRecord[index-1] !== true)
                this.buildChart();
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

    onDeleteClick() {
        this.taskService.delete(this.task._id).subscribe(res => {
            if(!res.error) {
                this.router.navigate(["/results"]);
            }
        });
    }

    onEditClick() {

    }
}