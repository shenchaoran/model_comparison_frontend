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
        private _notice: NzNotificationService,
        private title: DynamicTitleService
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.taskId = params['id'];
                this.service.findOne(this.taskId)
                    .subscribe(response => {
                        if (response.error) {
                            this._notice.warning('Warning:', 'Get task failed!');
                        }
                        else {
                            this.task = response.data;
                            this.title.setTitle(this.task.meta.name);
                            this.geojson = _.get(this.task, 'issue.spatial.geojson');
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
