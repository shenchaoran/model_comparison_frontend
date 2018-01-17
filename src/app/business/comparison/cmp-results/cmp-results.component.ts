import { Component, OnInit } from '@angular/core';
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
export class CmpResultsComponent implements OnInit {
    cmpTaskId;
    cmpTask;
    _taskSubscription;
    imageStaticLayers;

    selectedCmpObj;
    selectedCmpObjId;

    constructor(
        private service: CmpTaskService,
        private _notice: NzNotificationService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.cmpTaskId = params['id'];
                this.fetchInterval();
            });

        this.route.queryParams
            .subscribe((params: Params) => {
                this.updateTask(JSON.parse(params['cmpTask']));
            });
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
            this.onSelectObj(this.selectedCmpObjId);
        }
        else {
            this.selectFirst();
        }

        if (this.cmpTask.cmpState === CmpState.FINISHED) {
            this._taskSubscription.unsubscribe();
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

    onSelectObj(cmpObjId) {
        this.selectedCmpObjId = cmpObjId;
        this.selectedCmpObj = _.find(this.cmpTask.cmpCfg.cmpObjs, cmpObj => cmpObj.id === cmpObjId);
    }

    private selectFirst() {
        if(this.cmpTask.cmpCfg.cmpObjs.length && this.selectedCmpObjId === undefined) {
            this.selectedCmpObjId = this.cmpTask.cmpCfg.cmpObjs[0].id;
            this.selectedCmpObj = this.cmpTask.cmpCfg.cmpObjs[0];
        }
    }
}
