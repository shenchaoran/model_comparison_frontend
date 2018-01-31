import { Component, OnInit, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, filter, tap } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { _throw } from 'rxjs/observable/throw';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import * as uuidv1 from 'uuid/v1';
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
import { CmpTaskService } from '../services';
declare var ol: any;

@Component({
    selector: 'ogms-cmp-results',
    templateUrl: './cmp-results.component.html',
    styleUrls: ['./cmp-results.component.scss']
})
export class CmpResultsComponent implements OnInit, OnDestroy, AfterViewInit {
    _isLoading = true;
    cmpTaskId;
    cmpTask;
    _taskSubscription;
    fetchCount = 0;

    // tabsAttached: any = {};

    constructor(
        private service: CmpTaskService,
        private _notice: NzNotificationService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const cmpTaskStr = localStorage.getItem('currentCmpTask');
        if(cmpTaskStr) {
            this._isLoading = false;
            this.cmpTask = JSON.parse(cmpTaskStr);
            this.cmpTaskId = this.cmpTask._id;
            this.updateTask(this.cmpTask);
        }
        
        this.route.params
            .subscribe((params: Params) => {
                this.cmpTaskId = params['id'];
                if(!cmpTaskStr) {
                    this.refresh();
                }
                this.fetchInterval();
            });
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        if(this._taskSubscription) {
            localStorage.removeItem('currentCmpTask');
            this._taskSubscription.unsubscribe();
        }
    }

    private fetchInterval() {
        const cmpTask$ = interval(10000).pipe(
            switchMap((v, i) => {
                return this.service.find(this.cmpTaskId);
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
            cmpTask => {
                this.updateTask(cmpTask);
            },
            e => {
                this._notice.warning('Warning:', 'Get comparison task failed!');
            }
        );
    }

    private updateTask(cmpTask) {
        this.fetchCount++;
        this.cmpTask = cmpTask;
        this.setAttached();

        if (this.cmpTask.cmpState === CmpState.FINISHED) {
            if(this._taskSubscription) {
                this._taskSubscription.unsubscribe();
            }
        } else if (this.cmpTask.cmpState === CmpState.INIT) {
        } else if (this.cmpTask.cmpState === CmpState.RUNNING) {
        }

        _.map(this.cmpTask.cmpCfg.cmpObjs, cmpObj => {
            _.map(cmpObj.dataRefers as any[], dataRefer => {
                if(dataRefer.attached === undefined) {
                    dataRefer.attached = {}
                }
                dataRefer.attached.imageStaticLayers = [];
                if(dataRefer.cmpResult) {
                    _.map(cmpObj.methods, method => {
                        if(method === 'TABLE_CHART') {

                        }
                        else if(method === 'TABLE_STATISTIC') {

                        }
                        else if(method === 'SHAPEFILE_VISUALIZATION') {

                        }
                        else if(method === 'SHAPEFILE_STATISTIC') {

                        }
                        else if(method === 'SHAPEFILE_INTERPOLATION') {

                        }
                        else if(method === 'ASCII_GRID_VISUALIZATION') {

                        }
                        else if(method === 'ASCII_GRID_STATISTIC') {

                        }
                        else if(method === 'GIF') {

                        }
                        else if(method === 'ASCII_GRID_BATCH_VISUALIZATION') {
                            dataRefer.attached.imageStaticLayers = _.concat(dataRefer.attached.imageStaticLayers, dataRefer.cmpResult.image);
                        }
                    });
                }
            });
        });
        
        if(this.fetchCount === 1) {
            // 触发选中tab事件
            _.map(this.cmpTask.cmpCfg.cmpObjs as any[], cmpObj => {
                if(cmpObj.dataRefers.length) {
                    console.log('init tab request')
                    this.onTabSelected(cmpObj.id, cmpObj.dataRefers[0]);
                }
            });
        }
        this._isLoading = false;
    }

    refresh() {
        this.service.find(this.cmpTaskId).subscribe(response => {
            if(response.error) {
                this._notice.warning('Warning:', 'Get comparison task failed!');
            }
            else {
                this.updateTask(response.data.doc);
            }
        });
    }

    onTabSelected(cmpObjId, dataRefer) {
        // if(this.tabsAttached.cmpObjId === undefined) {
        //     this.tabsAttached.cmpObjId = {
        //         msId: dataRefer.msId
        //     };
        // }
        // else {
        //     this.tabsAttached.cmpObjId.msId = dataRefer.msId;
        // }
        
        let needFetch = false;
        _.map(this.cmpTask.cmpCfg.cmpObjs as any[], cmpObj => {
            if(cmpObj.id === cmpObjId) {
                if(_.indexOf(cmpObj.methods, 'TABLE_CHART') !== -1) {
                    if(!dataRefer.attached.fetchedResult) {
                        needFetch = true;
                    }
                }
            }
        });
        console.log(needFetch);
        if(needFetch) {
            this.getCmpResult(cmpObjId, dataRefer.msId);
        }
    }

    refreshResult(cmpObjId, dataRefer) {
        if(dataRefer.attached === undefined) {
            dataRefer.attached = {};
        }

        dataRefer.attached.isLoading = true;
        // this.tabsAttached.cmpObjId.isLoading = dataRefer.attached.isLoading;
    }

    private getCmpResult(cmpObjId, msId) {
        let needGet = false;
        _.map(this.cmpTask.cmpCfg.cmpObjs, cmpObj => {
            if(cmpObj.id === cmpObjId) {
                if(_.indexOf(cmpObj.methods, 'TABLE_CHART') !== -1) {
                    needGet = true;
                }
            }
        });

        if(needGet) {
            this.service.getCmpResult(this.cmpTaskId, cmpObjId, msId)
                .subscribe(response => {
                    if(response.error) {
                        this._notice.warning('Warning', 'Fetch comparison result failed!');
                    }
                    else {
                        if(response.data.done) {
                            _.map(this.cmpTask.cmpCfg.cmpObjs as any[], cmpObj => {
                                if(cmpObj.id === cmpObjId) {
                                    _.map(cmpObj.dataRefers as any[], dataRefer => {
                                        if(dataRefer.msId === msId) {
                                            dataRefer.cmpResult = response.data.cmpResult;
                                        }
                                    });   
                                }
                            });
                        }
                        else {

                        }
                    }
                });
        }
    }

    /**
     * 前台需要的数据存在了dataRefer.attached里
     * {
     *      selectedYear
     *      selectedStyle
     *      selectedYearOption
     *      selectedLayers
     * }
     */
    private setAttached() {
        _.map(this.cmpTask.cmpCfg.cmpObjs, cmpObj => {
            _.map(cmpObj.dataRefers, dataRefer => {
                if(dataRefer.attached === undefined) {
                    dataRefer.attached = {};
                }
                dataRefer.attached.selectedYear = undefined;
                dataRefer.attached.selectedStyle = 'SWIPE';
                this.setSelectedTimeOption(dataRefer);
                dataRefer.attached.selectedLayers = [];
                if(_.indexOf(cmpObj.methods, 'TABLE_CHART') !== -1) {
                    if(dataRefer.cmpResult && dataRefer.cmpResult.chart) {
                        // 初始把 table的可视化数据源丢掉了
                        dataRefer.attached.isLoading = true;
                    }
                }
                else {
                    dataRefer.attached.isLoading = false;
                }
            });
        });
    }

    onYearChange(year, dataRefer) {
        if(dataRefer.attached === undefined) {
            dataRefer.attached = {};
        }
        dataRefer.attached.selectedLayers = [];
        const regex = new RegExp(year);
        _.map(dataRefer.attached.imageStaticLayers, layerOpt => {
            if(layerOpt.state === CmpState.FINISHED_SUCCEED) {
                if(regex.test(layerOpt.title)) {
                    if(dataRefer.attached.selectedLayers.length < 2) {
                        dataRefer.attached.selectedLayers.push(layerOpt);
                    }
                }
            }
        });
    }

    onMapStyleChange(style) {

    }

    private setSelectedTimeOption(dataRefer) {
        dataRefer.attached.selectedYearOption = [];
        
        let gotYears = false;
        if(!gotYears) {
            if(
                dataRefer.cmpResult &&
                dataRefer.cmpResult.image &&
                dataRefer.cmpResult.image.length
            ) {
                _.map(dataRefer.cmpResult.image, img => {
                    let date = img.title;
                    const year = date.substr(0, 4);
                    if(!_.find(dataRefer.attached.selectedYearOption, v => v === year)) {
                        dataRefer.attached.selectedYearOption.push(year);
                    }
                });
                gotYears = true;
            }
        }
    }

    // TODO 监听不到scroll 事件
    @HostListener('scroll')
    onScroll(event: any) {
        // console.log('onScroll');
        // const scrollH = Math.max(
        //     window.pageYOffset,
        //     window.scrollY,
        //     document.documentElement.scrollTop,
        //     document.body.scrollTop
        // );
        const scrollH = jQuery('#root-container')[0].scrollTop;
        const h = jQuery('#separator')[0].offsetTop - scrollH;
        console.log(h);
        if (h < -50) {
            jQuery('.side-catalog').css('visibility', 'visible');
        } else {
            jQuery('.side-catalog').css('visibility', 'hidden');
        }
    }
}
