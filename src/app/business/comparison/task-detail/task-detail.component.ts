import { Component, OnInit, Input } from '@angular/core';
import { CmpTaskService } from '../services';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { CalcuTaskState, CmpState, CmpResult } from '@models';

@Component({
  selector: 'ogms-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  @Input() taskId: string;
  cmpTask: any;
  imageStaticLayers: Array<any>;
  constructor(
      private service: CmpTaskService,
      private _notice: NzNotificationService
    ) {}

  ngOnInit() {
    postal.channel('TASK_CHANNEL')
        .subscribe('find', (data, envelope) => {
            if(data.error) {
                this._notice.error('Error', 'find comparison task failed!');
            }
            else {
                this.cmpTask = data.data.doc;
                console.log(this.cmpTask);
                
                if(
                    this.cmpTask.cmpState === CmpState.FAILED || 
                    this.cmpTask.cmpState === CmpState.SUCCEED
                ) {
                    
                }
                else if(this.cmpTask.cmpState === CmpState.INIT) {

                }
                else if(this.cmpTask.cmpState === CmpState.RUNNING){
                    setTimeout(this.service.publishFind(this.taskId), 5000);
                }
                
                this.imageStaticLayers = [];
                _.map(this.cmpTask.cmpCfg.cmpObjs, cmpObj => {
                    if(cmpObj.cmpResults) {
                        _.map(cmpObj.cmpResults, cmpResult => {
                            if(cmpResult.image.length) {
                                _.map(cmpResult.image, img => {
                                    this.imageStaticLayers.push({
                                        ratio: 1,
                                        params: {
                                            LAYERS: 'show:0'
                                        },
                                        url: img.path,
                                        imageExtent: img.extent,
                                        projection: 'EPSG:3857'
                                    });
                                });
                            }
                        });
                    }
                });

            }
        });

    this.service.publishFind(this.taskId);
  }
}
