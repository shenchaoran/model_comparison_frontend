import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CmpTaskService } from '../services';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
    selector: 'ogms-task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, AfterViewInit {
    pageId: string;
    
    taskId: string;
    task: any;
    geojson: any;

    isVisible: boolean = false;
    okDisabled: boolean = true;
    checkOpts: {
        label: string,
        value: string,
        checked: boolean
    }[] = [];
    selectedCmpObj: any;

    constructor(
        private service: CmpTaskService,
        private route: ActivatedRoute,
//private _notice: NzNotificationService,
        private title: DynamicTitleService
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.taskId = params['id'];
                this.pageId = `/tasks/${this.taskId}`;
                this.service.findOne(this.taskId)
                    .subscribe(response => {
                        if (response.error) {
                            // this._notice.warning('Warning:', 'Get task failed!');
                        }
                        else {
                            this.task = response.data;
                            this.title.setTitle(this.task.meta.name);
                            this.geojson = _.get(this.task, 'issue.spatial.geojson');

                            _.map(this.task.cmpObjs, cmpObj => {
                                let chartSrc = {
                                    seriesData: [],
                                    seriesName: []
                                };
                                let statisticSrc = [];
                                if (cmpObj.schemaId === 'table column') {
                                    if (cmpObj.methods.indexOf('TABLE_CHART') !== -1) {
                                        const row = _.get(cmpObj, 'stdResult.chart.row');
                                        if (row && row.length) {
                                            chartSrc.seriesData.push(row);
                                            chartSrc.seriesName.push('Standard result');
                                        }
                                    }
                                    if (cmpObj.methods.indexOf('TABLE_STATISTIC') !== -1) {
                                        let row = _.get(cmpObj, 'stdResult.statistic.row');
                                        if (row && row.length) {
                                            row = _.concat('Standard result', row);
                                            statisticSrc.push(row);
                                        }
                                    }
                                    _.map(cmpObj.dataRefers, dataRefer => {
                                        if (cmpObj.methods.indexOf('TABLE_CHART') !== -1) {
                                            const row = _.get(dataRefer, 'cmpResult.chart.row');
                                            if (row && row.length) {
                                                chartSrc.seriesData.push(row);
                                                chartSrc.seriesName.push(dataRefer.msName);
                                            }
                                        }
                                        if (cmpObj.methods.indexOf('TABLE_STATISTIC') !== -1) {
                                            let row = _.get(dataRefer, 'cmpResult.statistic.row');
                                            if (row && row.length) {
                                                row = _.concat(dataRefer.msName, row);
                                                statisticSrc.push(row);
                                            }
                                        }
                                    });
                                    cmpObj.chartSrc = chartSrc;
                                    cmpObj.statisticSrc = statisticSrc;
                                }
                            });
                        }
                    });
            });
    }

    ngAfterViewInit() {
    }

    showModal(cmpObj) {
        this.checkOpts = [];
        if (cmpObj.stdResult) {
            this.checkOpts.push({
                label: 'Standard result',
                value: cmpObj.stdResult,
                checked: false
            });
        }
        this.checkOpts = _.concat(this.checkOpts, _.map(cmpObj.dataRefers, dataRefer => {
            return {
                label: dataRefer.msName,
                value: dataRefer.cmpResult,
                checked: false
            };
        }));
        this.selectedCmpObj = cmpObj;
        this.isVisible = true;
    }

    onChecked() {
        // 必须选两个

        // let length = (_.filter(this.checkOpts, item => item.checked)).length;
        // if(length === 2) {
        //     this.okDisabled = false;
        // }
        // else if(length > 2) {
        //     _.map(this.checkOpts, item => {
        //         if(item.checked && length> 2) {
        //             item.checked = false;
        //             length--;
        //         }
        //     });
        // }
        // this.checkOpts;
    }

    handleCancel(e) {
        this.isVisible = false;
    }

    handleOk(e) {
        let tab = {
            title: '',
            left: {},
            right: {}
        };
        let num = 1;
        _.map(this.checkOpts, (item, i) => {
            if (item.checked) {
                let key;
                if (num === 1) {
                    tab.title += item.label;
                    key = 'left';
                }
                else if (num === 2) {
                    tab.title += ' vs ' + item.label;
                    key = 'right';
                }
                num++;

                tab[key] = {
                    label: item.label,
                    layers: _.get(item.value, 'image')
                };
            }
        })
        if (!this.selectedCmpObj.tabs) {
            this.selectedCmpObj.tabs = [];
        }
        this.selectedCmpObj.tabs.push(tab);

        this.isVisible = false;
    }
}
