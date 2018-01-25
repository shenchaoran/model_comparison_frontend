import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class CmpResultsComponent implements OnInit, OnDestroy {
    cmpTaskId;
    cmpTask;
    _taskSubscription;

    imageStaticLayers;
    selectedLayers = [];

    selectedCmpObj;
    selectedCmpObjId;

    selectedYearOption = [];
    selectedYear;
    selectedStyle = 'SWIPE';
    

    constructor(
        private service: CmpTaskService,
        private _notice: NzNotificationService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const cmpTaskStr = localStorage.getItem('currentCmpTask');
        if(cmpTaskStr) {
            this.cmpTask = JSON.parse(cmpTaskStr);
            this.updateTask(this.cmpTask);
        }
        else {
            this.refresh();
        }
        
        this.route.params
            .subscribe((params: Params) => {
                this.cmpTaskId = params['id'];
                this.fetchInterval();
            });
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
        this.cmpTask = cmpTask;
        if(this.selectedCmpObjId) {
            // this.onSelectCmpObj(this.selectedCmpObjId);
        }
        else {
            this.selectFirst();
        }

        if (this.cmpTask.cmpState === CmpState.FINISHED) {
            if(this._taskSubscription) {
                this._taskSubscription.unsubscribe();
            }
        } else if (this.cmpTask.cmpState === CmpState.INIT) {
        } else if (this.cmpTask.cmpState === CmpState.RUNNING) {
        }

        this.imageStaticLayers = [];
        _.map(this.cmpTask.cmpCfg.cmpObjs, cmpObj => {
            _.map(cmpObj.dataRefers as any[], dataRefer => {
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
                            this.imageStaticLayers = _.concat(this.imageStaticLayers, dataRefer.cmpResult.image);
                            
                            // _.map(dataRefer.cmpResult.image, image => {
                                // if(image.state === CmpState.FINISHED_SUCCEED) {
                                //     this.imageStaticLayers.push(new ol.layer.Image({
                                //         title: image.title,
                                //         source: new ol.source.ImageStatic({
                                //             ratio: 1,
                                //             params: {
                                //                 LAYERS: 'show:0'
                                //             },
                                //             url: image.path,
                                //             imageExtent: image.extent,
                                //             projection: 'EPSG:3857'
                                //         })
                                //     }));
                                // }
                            // });
                        }
                    })
                }
            });
        });
        // console.log(this.imageStaticLayers);
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

    // onSelectCmpObj(cmpObjId) {
    //     this.selectedCmpObjId = cmpObjId;
    //     this.selectedCmpObj = _.find(this.cmpTask.cmpCfg.cmpObjs, cmpObj => cmpObj.id === cmpObjId);
    //     this.setSelectedTimeOption();

    //     this.selectedLayers = [];
    //     this.selectedYear = undefined;
    // }

    private selectFirst() {
        if(this.cmpTask.cmpCfg.cmpObjs.length && this.selectedCmpObjId === undefined) {
            this.selectedCmpObjId = this.cmpTask.cmpCfg.cmpObjs[0].id;
            this.selectedCmpObj = this.cmpTask.cmpCfg.cmpObjs[0];

            this.setSelectedTimeOption();

            this.selectedLayers = [];
            this.selectedYear = undefined;
        }
    }

    onYearChange(year) {
        this.selectedLayers = [];
        const regex = new RegExp(year);
        _.map(this.imageStaticLayers, layerOpt => {
            if(layerOpt.state === CmpState.FINISHED_SUCCEED) {
                if(regex.test(layerOpt.title)) {
                    if(this.selectedLayers.length < 2) {
                        this.selectedLayers.push(layerOpt);
                    }
                }
            }
        });
    }

    onMapStyleChange(style) {

    }

    private setSelectedTimeOption() {
        this.selectedYearOption = [];
        
        let gotYears = false;
        _.map(this.selectedCmpObj.dataRefers, dataRefer => {
            if(!gotYears) {
                if(
                    dataRefer.cmpResult &&
                    dataRefer.cmpResult.image &&
                    dataRefer.cmpResult.image.length
                ) {
                    _.map(dataRefer.cmpResult.image, img => {
                        let date = img.title;
                        const year = date.substr(0, 4);
                        if(!_.find(this.selectedYearOption, v => v === year)) {
                            this.selectedYearOption.push(year);
                        }
                    });
                    gotYears = true;
                }
            }
        });
    }
}
