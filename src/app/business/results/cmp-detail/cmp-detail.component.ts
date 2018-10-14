import { Component, OnInit, HostListener, ViewChildren, QueryList, ElementRef, Renderer2 } from "@angular/core";
import { SlnService } from "../../comparison";
import { TaskService } from '../../services/task.service';
import { MSService } from '../../services';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@common/core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DocBaseComponent } from '@common/shared';
import { Observable, interval } from 'rxjs'
import { map, switchMap, filter, tap, startWith } from 'rxjs/operators';
import { CmpState } from '@models'

@Component({
    selector: 'ogms-cmp-detail',
    templateUrl: './cmp-detail.component.html',
    styleUrls: ['./cmp-detail.component.scss']
})
export class CmpDetailComponent extends DocBaseComponent implements OnInit {
    cmpTask;
    @ViewChildren('echartDOM') echartDOM: QueryList<ElementRef>;

    constructor(
        public route: ActivatedRoute,
        public slnService: TaskService,
        public title: DynamicTitleService,
        public renderer2: Renderer2
    ) {
        super(route, slnService, title);
    }

    ngOnInit() {
        super.ngOnInit();
        this._subscriptions.push(this.doc.subscribe(doc => {
            this.cmpTask = doc;
            this.fetchInterval();
        }));
    }

    private fetchInterval() {
        const record$ = interval(3000).pipe(
            switchMap((v, i) => {
                return this.slnService.findOne(this.cmpTask._id, false);
            }),
            map(response => {
                if (!response.error) {
                    return response.data;
                }
            })
        )

        const subscription = record$.subscribe(doc => {
            this.cmpTask = doc;
            if (this.cmpTask.state !== CmpState.RUNNING) {
                subscription.unsubscribe();
                if (this.cmpTask.state === CmpState.FINISHED_SUCCEED ||
                    this.cmpTask.state === CmpState.FINISHED_FAILED)
                    this.buildChart();
            }
        });
        this._subscriptions.push(subscription)
    }

    private buildChart() {
        let i = 0;
        setTimeout(() => {
            let $echartDOMs = $('.echart-dom')
            this.cmpTask.cmpObjs.map(cmpObj => {
                cmpObj.methods.map((method) => {
                    if (method.id === '5b713f39a4857f1ba4be23ff') {
                        if (method.result.state === CmpState.FINISHED_SUCCEED) {
                            echarts
                                .init($echartDOMs[i])
                                .setOption(method.result);
                        }
                        i++;
                    }
                })
            })
        }, 10);
    }
}