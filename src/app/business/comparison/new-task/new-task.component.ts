import { Component, OnInit } from '@angular/core';
import { CmpSlnService, CmpTaskService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { CmpSolution, CmpTask, ResourceSrc } from '@models';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { DataService } from '../../geo-data/services';
import { MAP_TOOLBAR_CONFIG } from './map.config';

@Component({
  selector: 'ogms-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
    providers: [
        {
            provide: 'MAP_TOOLBAR_CONFIG',
            useValue: MAP_TOOLBAR_CONFIG
        }
    ]
})
export class NewTaskComponent implements OnInit {
  cmpSolution: CmpSolution;
  cmpTask: CmpTask = new CmpTask();

  __loading: boolean = true;
  startDate: Date;
  endDate: Date;

  currentStep = 1;
  nextDisabled: boolean = true;
  doneDisabled: boolean = true;
  __isConfirmVisible: boolean = false;

  testStr: string;

  constructor(
    private service: CmpTaskService,
    private slnService: CmpSlnService,
    private route: ActivatedRoute,
    private router: Router,
    private _notice: NzNotificationService,
    private modalService: NzModalService,
    private dataService: DataService
  ) {
    const slnStr = localStorage.getItem('cmpSolution');
    if (slnStr) {
      this.cmpSolution = JSON.parse(slnStr);
      this.cmpTask.cmpCfg.solutionId = this.cmpSolution._id;
    } else {
      this._notice.warning(
        'Warning',
        'The corresponding comparison solution not found!'
      );
    }
  }

  ngOnInit() {
      this.cmpTask.calcuCfg.dataSrc = 'std';
    this.route.data.subscribe(resolveData => {
      this.__loading = false;
      const STD_DATA_STR = localStorage.getItem('STD_DATA');
      if (STD_DATA_STR) {
        const STD_DATA = JSON.parse(STD_DATA_STR);
        this.startDate = new Date(STD_DATA.temporal.start);
        this.endDate = new Date(STD_DATA.temporal.end);

        this.cmpTask.calcuCfg.stdSrc.temporal.start = this.startDate.getTime();
        this.cmpTask.calcuCfg.stdSrc.temporal.end = this.endDate.getTime();
      }
    });
  }

  changeStep(newStep) {
    if (this.currentStep < newStep) {
      this.nextDisabled = true;
    } else if (this.currentStep > newStep) {
      this.nextDisabled = false;
    }
    this.currentStep = newStep;
  }

  done() {}

  updateStepyValid() {
    if (this.currentStep === 0) {
      if (
        this.cmpTask.meta.name &&
        this.cmpTask.meta.desc &&
        this.cmpTask.auth.src !== undefined &&
        this.cmpTask.calcuCfg.dataSrc !== undefined &&
        this.cmpTask.calcuCfg.stdSrc.temporal.start !== undefined &&
        this.cmpTask.calcuCfg.stdSrc.temporal.end !== undefined
      ) {
        this.nextDisabled = false;
      } else {
        this.nextDisabled = true;
      }
    } else if (this.currentStep === 1) {
    }
  }

  startDateChange() {
    if (this.startDate > this.endDate) {
      this.endDate = undefined;
      this.cmpTask.calcuCfg.stdSrc.temporal.end = undefined;
    } else {
      this.cmpTask.calcuCfg.stdSrc.temporal.start = this.startDate? this.startDate.getTime(): undefined;
    }
  }

  endDateChange() {
    if (this.startDate > this.endDate) {
      this.startDate = undefined;
      this.cmpTask.calcuCfg.stdSrc.temporal.start = undefined;
    } else {
      this.cmpTask.calcuCfg.stdSrc.temporal.end = this.endDate? this.endDate.getTime(): undefined;
    }
  }

  disableStartDate(startV) {
    const STD_DATA_STR = localStorage.getItem('STD_DATA');
    if (STD_DATA_STR) {
      const STD_DATA = JSON.parse(STD_DATA_STR);

      if (STD_DATA) {
        if (this.endDate) {
          return !(
            startV.getTime() <= this.endDate &&
            startV.getTime() >= STD_DATA.temporal.start
          );
        } else {
          return !(
            startV.getTime() <= STD_DATA.temporal.end &&
            startV.getTime() >= STD_DATA.temporal.start
          );
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  disableEndDate(endV) {
    const STD_DATA_STR = localStorage.getItem('STD_DATA');
    if (STD_DATA_STR) {
      const STD_DATA = JSON.parse(STD_DATA_STR);

      if (STD_DATA) {
        if (this.startDate) {
          return !(
            endV.getTime() >= this.startDate &&
            endV.getTime() <= STD_DATA.temporal.end
          );
        } else {
          return !(
            endV.getTime() <= STD_DATA.temporal.end &&
            endV.getTime() >= STD_DATA.temporal.start
          );
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  handleCancel(e) {
    this.__isConfirmVisible = false;
  }

  handleOk(e) {
    this.__isConfirmVisible = true;
    // this.router.navigate(['../..', 'tasks', 'new'], {
    //   relativeTo: this.route
    // });
  }
}
