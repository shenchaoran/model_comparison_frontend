import {
  Component,
  OnInit,
  AfterViewInit,
  EventEmitter,
  Output,
  ViewChildren,
  ElementRef,
  QueryList
} from '@angular/core';
import { CmpSlnService, CmpTaskService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { CmpSolution, CmpTask, ResourceSrc, CmpObj, CmpMethod } from '@models';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { DataService } from '../../geo-data/services';
import { MSService } from '../../geo-model/services';
import { MAP_TOOLBAR_CONFIG } from './map.config';
import { NgUploaderOptions } from 'ngx-uploader';
import {
  OlMapService
  //   ToolbarService
} from '@common/feature/ol-map/ol-map.module';
import { BaFileUploader } from '@shared';
import { ToolbarService } from '../services';

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
  ]
})
export class NewTaskComponent implements OnInit, AfterViewInit {
  cmpSolution: CmpSolution;
  cmpTask: CmpTask = new CmpTask();

  fileUploaderOptions: NgUploaderOptions;
  @ViewChildren(BaFileUploader) fileUploaders: QueryList<BaFileUploader>;
  @Output() onFileUpload = new EventEmitter<any>();
  @Output() onFileUploadCompleted = new EventEmitter<any>();

  __ms: Array<{
    msId: string;
    msName: string;
    nodeName: string;
    participate: boolean;
    data: any;
  }> = [];
  __participantsValid: boolean = false;
  __selectMode: 'single' | 'multiple';
  __loading: boolean = true;
  startDate: Date;
  endDate: Date;

  currentStep = 0;
  nextDisabled: boolean = true;
  doneDisabled: boolean = true;
  __isConfirmVisible: boolean = false;
  __isCmpModalVisible: boolean = false;

  selectedCmpObj;
  selectedMS;

  constructor(
    private service: CmpTaskService,
    private msService: MSService,
    private slnService: CmpSlnService,
    private route: ActivatedRoute,
    private router: Router,
    private _notice: NzNotificationService,
    private modalService: NzModalService,
    private dataService: DataService,
    private mapService: OlMapService,
    private toolbarService: ToolbarService
  ) {
    this.fileUploaderOptions = {
      url: 'data',
      data: {
        desc: '',
        src: ResourceSrc.EXTERNAL,
        userId: JSON.parse(localStorage.getItem('jwt')).user._id
      },
      multiple: true,
      fieldName: 'geo-data',
      customHeaders: {
        Authorization: 'bearer ' + JSON.parse(localStorage.getItem('jwt')).token
      }
    };
    const slnStr = localStorage.getItem('cmpSolution');
    if (slnStr) {
      this.cmpSolution = JSON.parse(slnStr);
      this.__selectMode =
        this.cmpSolution.cmpCfg.keynote.direction === 'x'
          ? 'multiple'
          : 'single';
      this.cmpTask.cmpCfg.keynote = this.cmpSolution.cmpCfg.keynote;
      this.cmpTask.cmpCfg.solutionId = this.cmpSolution._id;
      this.cmpTask.cmpCfg.cmpObjs = _.map(
        this.cmpSolution.cmpCfg.cmpObjs,
        (cmpObj, i) => {
          return {
            ...cmpObj,
            dataRefers: [],
            attached: {
              active: i === 0 ? true : false
            }
          };
        }
      );
      this.cmpTask.calcuCfg.stdSrc.spatial.dimension = this.cmpSolution.cmpCfg.keynote.dimension;
    } else {
      this._notice.warning(
        'Warning',
        'The corresponding comparison solution not found!'
      );
    }
  }

  onSelectEvent(e, dataRefer) {
      dataRefer.attached.schema = undefined;
    if (e) {
      dataRefer.eventName = e.id;
      _.map(this.__ms, ms => {
        if (ms.msId === dataRefer.msId) {
          _.map(ms.data.MDL.IO.data, event => {
            if (dataRefer.eventName === event.id) {
              _.map(ms.data.MDL.IO.schemas, schema => {
                if (schema.id === event.schemaId) {
                  dataRefer.attached.schema = schema;
                }
              });
            }
          });
        }
      });
	}
	
    this.updateStepyValid();
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
      //   this.nextDisabled = false;
    } else if (this.currentStep > newStep) {
      this.nextDisabled = false;
    }
    this.currentStep = newStep;

    this.updateStepyValid();
  }

  onParticipantsChange(e) {
    if (e.valid) {
      this.__participantsValid = true;
      this.__ms = _.map(e.participants, ms => {
        const _ms = _.cloneDeep(ms);
        _ms.data.MDL.IO.data = this.msService.UDXDataFilter(
          _ms.data,
          this.cmpTask.cmpCfg.keynote.dimension
        );
        return _ms;
      });
      this.cmpTask.cmpCfg.ms = _.map(e.participants, (ms, i) => {
        const _ms = _.cloneDeep(ms);
        _.unset(_ms, 'data');
        return _ms;
      });

      _.map(this.cmpTask.cmpCfg.cmpObjs, cmpObj => {
        cmpObj.dataRefers = [];
        _.map(this.__ms, (ms, i) => {
          cmpObj.dataRefers.push({
            msId: ms.msId,
            msName: ms.msName,
            eventName: undefined,
            dataId: undefined,
            data: {
              field: undefined
            },
            attached: {
              active: i === 0 ? true : false,
              src: ''
            }
          });
        });
      });
    } else {
      this.__participantsValid = false;
    }
    this.updateStepyValid();
  }

  done() {
    this.updateStepyValid();
    if (this.doneDisabled) {
      this._notice.create(
        'warning',
        'Warning:',
        'Please configure this task completely!'
      );
    } else {
      if (this.cmpSolution.cmpCfg.keynote.dimension === 'point') {
        this.cmpTask.calcuCfg.stdSrc.spatial.point = JSON.parse(
          this.toolbarService.saveFeatures('EPSG:3857')
        );
      } else if (this.cmpSolution.cmpCfg.keynote.dimension === 'polygon') {
        this.cmpTask.calcuCfg.stdSrc.spatial.polygon = JSON.parse(
          this.toolbarService.saveFeatures('EPSG:3857')
        );
      }
	this.service.changeParticipation(this.cmpTask);
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
  }

  onDrawRecEnd() {
    this.nextDisabled = false;
  }

  updateStepyValid() {
    if (this.currentStep === 0) {
      if (
        this.cmpTask.meta.name &&
        this.cmpTask.meta.desc &&
        this.cmpTask.auth.src !== undefined
      ) {
        this.nextDisabled = false;
      } else {
        this.nextDisabled = true;
      }
    } else if (this.currentStep === 1) {
      this.nextDisabled = !this.__participantsValid;
    } else if (this.currentStep === 2) {
      let nextDisabled = false;
      _.map(this.cmpTask.cmpCfg.cmpObjs, cmpObj => {
        _.map(cmpObj.dataRefers, dataRefer => {
          if (nextDisabled === false) {
            if (dataRefer.attached.src === 'Computing') {
              if (
				dataRefer.eventName === '' 
				|| dataRefer.eventName === undefined
				|| dataRefer.data === undefined
				|| dataRefer.data.field === undefined
              ) {
                nextDisabled = true;
                return;
              }
            } else if (dataRefer.attached.src === 'Uploading') {
              if (dataRefer.dataId === undefined || dataRefer.dataId === '') {
                nextDisabled = true;
                return;
              }
            }
          }
        });
      });
      this.nextDisabled = nextDisabled;
    } else if (this.currentStep === 3) {
      this.doneDisabled = false;
    }
  }

  showModal(cmpObj, msId) {
    this.selectedCmpObj = cmpObj;
    let selectedMS;
    _.map(this.__ms, ms => {
      if (ms.data._id === msId) {
        selectedMS = _.cloneDeep(ms.data);
      }
    });
    selectedMS.MDL.IO.data = this.msService.UDXDataFilter(
      selectedMS,
      this.cmpTask.cmpCfg.keynote.dimension
    );
    this.selectedMS = selectedMS;
    this.selectedMS.attached = {
      dimension: this.cmpTask.cmpCfg.keynote.dimension,
      schemaName: this.selectedCmpObj.schemaName
    };
    this.__isCmpModalVisible = true;
  }

  modalSubmit(cfg) {
    this.__isCmpModalVisible = false;
    _.map(this.selectedCmpObj.dataRefers, dataRefer => {
      if (dataRefer.msId === this.selectedMS._id) {
        dataRefer.eventName = cfg.eventName;
        dataRefer.data.field = cfg.fieldName;
        dataRefer.schema$ = cfg.schema$;
      }
    });
  }

  modalCancel() {
    this.__isCmpModalVisible = false;
  }

  // region upload
  _onFileUpload(data, cmpObjId, msId, eventName) {}

  _onFileUploadCompleted(data, cmpObjId, msId, eventName) {
    if (!data.abort && data.done && !data.error) {
      const response = JSON.parse(data.response);
      if (_.startsWith(_.get(response, 'status.code'), '200')) {
        // postal.channel('DATA_CHANNEL').publish('data.add', response.data);
        _.map(this.cmpTask.cmpCfg.cmpObjs, cmpObj => {
          if (cmpObj.id === cmpObjId) {
            _.map(cmpObj.dataRefers, dataRefer => {
              if (dataRefer.msId === msId) {
                dataRefer.dataId = response.data.doc._id;
                this.updateStepyValid();
              }
            });
          }
        });
        this._notice.create('success', 'Info:', 'loading data succeed!');
      } else {
        this._notice.create(
          'warning',
          'Warning:',
          'loading data failed, please retry later!'
        );
      }
    } else {
      this._notice.create(
        'warning',
        'Warning:',
        'loading data failed, please retry later!'
      );
    }
  }

  _onClearUploaded(cmpObjId, msId, eventName) {
    _.map(this.cmpTask.cmpCfg.cmpObjs, cmpObj => {
      if (cmpObj.id === cmpObjId) {
        _.map(cmpObj.dataRefers, dataRefer => {
          if (dataRefer.msId === msId) {
            dataRefer.dataId = undefined;
            // this.doneDisabled = true;
            this._notice.create('success', 'Success:', 'Remove file succeed!');
          }
        });
      }
    });
  }
  // endregion

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
    this.service.start(this.cmpTask._id).subscribe(response => {
      this.__isConfirmVisible = false;
      if (response.error) {
        this._notice.warning('Warning', 'Start comparison task failed!');
      } else {
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
