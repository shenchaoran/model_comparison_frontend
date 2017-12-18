import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CmpSlnService, CmpTaskService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { CmpSolution, CmpTask, ResourceSrc } from '@models';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { DataService } from '../../geo-data/services';
import { MAP_TOOLBAR_CONFIG } from './map.config';
import {
  OlMapService,
  ToolbarService
} from '@common/feature/ol-map/ol-map.module';

declare var ol: any;

@Component({
  selector: 'ogms-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  providers: [
    {
      provide: 'MAP_TOOLBAR_CONFIG',
      useValue: MAP_TOOLBAR_CONFIG
    }
    // {
    //     provide: 'MAP_MODULES_CONFIG',
    //     useValue: MAP_MODULES_CONFIG
    // }
  ]
})
export class NewTaskComponent implements OnInit, AfterViewInit {
  cmpSolution: CmpSolution;
  cmpTask: CmpTask = new CmpTask();

  __loading: boolean = true;
  startDate: Date;
  endDate: Date;

  currentStep = 0;
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
    private dataService: DataService,
    private mapService: OlMapService,
    private toolbarService: ToolbarService
  ) {
    const slnStr = localStorage.getItem('cmpSolution');
    if (slnStr) {
      this.cmpSolution = JSON.parse(slnStr);
      this.cmpTask.cmpCfg.solutionId = this.cmpSolution._id;
      this.cmpTask.calcuCfg.stdSrc.spatial.dimension = this.cmpSolution.cfg.keynote.dimension;
    } else {
      this._notice.warning(
        'Warning',
        'The corresponding comparison solution not found!'
      );
    }
  }

  ngAfterViewInit() {
    // // The map
    // var map = new ol.Map({
    //   target: 'map',
    //   view: new ol.View({
    //     zoom: 14,
    //     center: [270701, 6247637]
    //   }),
    //   layers: [new ol.layer.Tile({ source: new ol.source.OSM() })]
    // });
    // console.log('ok');
    // // Add a custom push button with onToggle function
    // var hello = new ol.control.Button({
    //   html: '<i class="fa fa-smile-o"></i>',
    //   className: 'hello',
    //   title: 'Hello world!',
    //   handleClick: function() {
    //     info('hello World!');
    //   }
    // });
    // map.addControl(hello);
    // // Add a save button with on active event
    // var save = new ol.control.Button({
    //   html: '<i class="fa fa-download"></i>',
    //   className: 'save',
    //   title: 'Save',
    //   handleClick: function() {
    //     info(
    //       'Center: ' +
    //         map.getView().getCenter() +
    //         ' - zoom: ' +
    //         map.getView().getZoom()
    //     );
    //   }
    // });
    // map.addControl(save);
    // // Show info
    // function info(i) {
    //   jQuery('#info').html(i || '');
    // }
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

  done() {
    if (this.cmpSolution.cfg.keynote.dimension === 'point') {
      this.cmpTask.calcuCfg.stdSrc.spatial.point = JSON.parse(
        this.toolbarService.saveFeatures('EPSG:3857')
      );
    } else if (this.cmpSolution.cfg.keynote.dimension === 'polygon') {
      this.cmpTask.calcuCfg.stdSrc.spatial.polygon = JSON.parse(
        this.toolbarService.saveFeatures('EPSG:3857')
      );
    }

    console.log(this.cmpTask);
    this.service.insert(this.cmpTask).subscribe(response => {
      if (response.error) {
        this._notice.warning('Warning', 'Create comparison task failed!');
      } else {
        this._notice.success('Success', 'Create comparison task succeed!');
        this.cmpTask._id = response.data.doc._id;
        this.__isConfirmVisible = true;
      }
    });
  }

  onDrawRecEnd() {
    this.doneDisabled = false;
  }

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

  // region Date validate
  startDateChange() {
    if (this.startDate > this.endDate) {
      this.endDate = undefined;
      this.cmpTask.calcuCfg.stdSrc.temporal.end = undefined;
    } else {
      this.cmpTask.calcuCfg.stdSrc.temporal.start = this.startDate
        ? this.startDate.getTime()
        : undefined;
    }
    this.updateStepyValid();
  }

  endDateChange() {
    if (this.startDate > this.endDate) {
      this.startDate = undefined;
      this.cmpTask.calcuCfg.stdSrc.temporal.start = undefined;
    } else {
      this.cmpTask.calcuCfg.stdSrc.temporal.end = this.endDate
        ? this.endDate.getTime()
        : undefined;
    }
    this.updateStepyValid();
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
  // endregion

  // region modal
  handleCancel(e) {
    this.__isConfirmVisible = false;
  }

  handleOk(e) {
    this.service.start(this.cmpTask._id)
        .subscribe(response => {
            this.__isConfirmVisible = false;
            if(response.error) {
                this._notice.warning('Warning', 'Start comparison task failed!');
            }
            else {
                this._notice.success('Success', 'Start comparison task succeed!');
                // TODO
                this.router.navigate(['..'], {
                    relativeTo: this.route
                });
            }
        });
  }
  // endregion
}
