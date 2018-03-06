import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CmpSlnService } from "../../cmp-solution/services/cmp-sln.service";
import { MSService } from "../../geo-model/services/model.service";
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

    constructor(
        private route: ActivatedRoute,
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
    }

    onSelectClick(solution) {
      this.slnService.findOne(solution._id).subscribe(response => {
        if (response.error) {
          this._notice.warning("Warning:", "Get solution failed");
        } else {
          this.selectedSln = response.data;
          this.models = [];

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
        }
      });
    }
}
