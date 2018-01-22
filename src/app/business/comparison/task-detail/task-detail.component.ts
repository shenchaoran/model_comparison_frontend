import { Component, OnInit, OnDestroy, Input, AfterViewInit, AfterViewChecked } from '@angular/core';
import { CmpTaskService } from '../services';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import * as uuidv1 from 'uuid/v1';
import { Router, ActivatedRoute } from '@angular/router';
import {
    CalcuTaskState,
    CmpState,
    CmpResult,
    CmpSolution,
    CmpTask,
    ResourceSrc,
    CmpObj,
    CmpMethod
} from '@models';
import {
    OlMapService,
    RegionMapService,
    ToolbarService
} from '@common/feature/ol-map/ol-map.module';
import { Observable } from 'rxjs';
import { map, switchMap, filter, tap } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { _throw } from 'rxjs/observable/throw';

@Component({
    selector: 'ogms-task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
    _taskId: string;
    _taskSubscription;

    // _hasCreatedMap: boolean;
    _containerId: string;

    @Input()
    set taskId(v) {
        if (v) {
            this._taskId = v;
            this.cmpTask = undefined;
            this.imageStaticLayers = [];
            this.refresh();
        }
    }
    get taskId() {
        return this._taskId;
    }
    cmpTask: any;
    imageStaticLayers: Array<any>;
    constructor(
        private service: CmpTaskService,
        private _notice: NzNotificationService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this._containerId = uuidv1();
    }

    ngOnInit() {
        this.fetchInterval();
    }
    
    ngOnDestroy() {
        this._taskSubscription.unsubscribe();
    }

    ngAfterViewInit() {
        
    }

    ngAfterViewChecked() {
        // if(!this._hasCreatedMap) {
        //     if(jQuery(`#${this._containerId}`).length) {
        //         postal
        //             .channel('MAN_CHANNEL')
        //             .publish(`map.create.${this._containerId}`, undefined);
                
        //         this._hasCreatedMap = true;
        //     }
        // }
    }

    private fetchInterval() {
        const cmpTask$ = interval(10000).pipe(
            switchMap((v, i) => {
                return this.service.find(this.taskId);
            }),
            map(response => {
                if (response.error) {
                    return _throw(response.error);
                } else {
                    return response.data.doc;
                }
            })
        );

        this._taskSubscription = cmpTask$.subscribe(
            this.updateTask.bind(this),
            e => {
                this._notice.warning('Warning:', 'Get comparison task failed!');
            }
        );
    }

    private updateTask(cmpTask) {
        // console.log(cmpTask);
        this.cmpTask = cmpTask;

        if (this.cmpTask.cmpState === CmpState.FINISHED) {
            this._taskSubscription.unsubscribe();
        } else if (this.cmpTask.cmpState === CmpState.INIT) {
        } else if (this.cmpTask.cmpState === CmpState.RUNNING) {
        }
    }

    refresh() {
        this.service.find(this.taskId).subscribe(response => {
            if(response.error) {
                this._notice.warning('Warning:', 'Get comparison task failed!');
            }
            else {
                this.updateTask(response.data.doc);
            }
        });
    }

    edit() {}

    checkResult() {
        localStorage.setItem('currentCmpTask', JSON.stringify(this.cmpTask));
        this.router.navigate([`${this._taskId}`], {
            relativeTo: this.route
        });
    }

    _tabChange(e) {}
}
