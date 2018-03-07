import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CmpSlnService } from "../../cmp-solution/services/cmp-sln.service";
import { MSService } from "../../geo-model/services/model.service";
import { CmpTaskService } from "../services/cmp-task.service";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";

@Component({
    selector: "ogms-new-task",
    templateUrl: "./new-task.component.html",
    styleUrls: ["./new-task.component.scss"]
})
export class NewTaskComponent implements OnInit {
    task: any;
    solutions: any[];
    selectedSln: any;
    models: any[];
    param: any[];

    paramCards: any[];

    constructor(
        private route: ActivatedRoute,
        private taskService: CmpTaskService,
        private slnService: CmpSlnService,
        private msService: MSService,
        private _notice: NzNotificationService
    ) {}

    ngOnInit() {
        this.slnService.findAll({}).subscribe(response => {
            if (response.error) {
                this._notice.warning("Warning:", "Get solution list failed!");
            } else {
                this.solutions = response.data.docs;
            }
        });
        const auth = {
          userId: '5a290f90dda5de93f925111e',
          userName: 'Admin',
          src: 3
        }
        this.task = {};
        _.assign(this.task, {auth});

        this.paramCards = [
          {
            name: 'Nanjing npp compare task',
            author: 'Bowen',
            temporal: '1980-1-1   1992-1-1',
            spatial: 'China',
          },
          {
            name: 'Suzhou npp compare task',
            author: 'Bowen',
            temporal: '1980-1-1   1992-1-1',
            spatial: 'China',
          },
          {
            name: 'Heilongjiang npp compare task',
            author: 'Bowen',
            temporal: '1980-1-1   1992-1-1',
            spatial: 'China',
          },
          {
            name: 'Beijing npp compare task',
            author: 'Bowen',
            temporal: '1980-1-1   1992-1-1',
            spatial: 'China',
          },
          {
            name: 'Shanghai npp compare task',
            author: 'Bowen',
            temporal: '1980-1-1   1992-1-1',
            spatial: 'China',
          }
        ];

        this.param = [
          {
            msId: '5a1122b1a5559025a032a19b',
            eventName: 'soil',
            dataId: '5a701661d8482de0f5108e48'
          },
          {
            msId: '5a1122b1a5559025a032a19b',
            eventName: 'temporature',
            dataId: '5a701661d8482de0f5108e46'
          }
        ];
    }

    onSelectClick(solution) {
      this.slnService.findOne(solution._id).subscribe(response => {
        if (response.error) {
          this._notice.warning("Warning:", "Get solution failed");
        } else {
          this.selectedSln = response.data;
          this.models = [];

          //向solution添加model详细信息
          console.log(this.selectedSln.cmpCfg.ms);
          for (let i = 0; i < this.selectedSln.cmpCfg.ms.length; i++) {
            let modelId = this.selectedSln.cmpCfg.ms[i].msId;
            this.msService.findOne(modelId).subscribe(response => {
              if(response.error) {
                this._notice.warning("Warning:", "Get model failed");
              } else {
                this.models.push(response.data);
              }
            })
          }
          this.selectedSln.cmpCfg.models = this.models;

          //向model的配置参数添加历史task对应该参数的配置信息

          //增加task信息
          _.assign(this.task,  
            {solutionId: this.selectedSln._id}, 
            {issueId: this.selectedSln.issueId},
            {cmpObjs: this.selectedSln.cmpCfg.cmpObjs},
            {cmpState: 0},
            {calcuTasks: []});
        }
      });
    }

    onSelectParamExample() {
      const text = {};
      _.assign(text, this.task);
      console.log(text);
    }

    onSubmitTask() {
      //TODO   验证参数 Task名 合法性  


      const date = new Date().getTime();
      const meta = {
        time: date,
        desc: 'XXX',
        name: `test${date}`
      }
      _.assign(this.task, {meta}, {parameters: this.param});

      console.log(this.task);
      
      this.taskService.insert(this.task).subscribe(response => {
        if (response.error) {
          this._notice.warning("Warning:", "Create task failed");
        } else {

        }
      })
    }
}
