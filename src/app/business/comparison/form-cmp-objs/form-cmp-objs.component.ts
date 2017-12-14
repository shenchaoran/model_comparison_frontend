import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  forwardRef,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  OnChanges,
  SimpleChange,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { CmpObj, MS, CmpMethod } from '@models';
import { MSService } from '../../geo-model/services';

@Component({
  selector: 'ogms-form-cmp-objs',
  templateUrl: './form-cmp-objs.component.html',
  styleUrls: ['./form-cmp-objs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormCmpObjsComponent),
      multi: true
    }
    // {
    //     provide: NG_VALIDATORS,
    //     useExisting: forwardRef(() => FormCmpObjsComponent),
    //     multi: true
    // }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCmpObjsComponent
  implements ControlValueAccessor, OnInit, OnChanges {
  @Input()
  keynote: {
    direction: 'x' | 'y';
    dimension: 'point' | 'polygon' | 'multi-point';
    participants: Array<any>;
  };

  cmpObjs: Array<CmpObj> = [];

  selectedCmpObj: CmpObj;
  selectedMS: MS;

  isModalVisible: boolean = false;

  constructor(
    private _notification: NzNotificationService,
    private msService: MSService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    // this.cdRef.markForCheck();
    // this.cdRef.detectChanges();
    const knChange = changes['keynote'];
    if (!_.isEqual(knChange.currentValue, knChange.previousValue)) {
      this.cmpObjs = [];
      this.selectedCmpObj = undefined;
      this.selectedMS = undefined;
      this.isModalVisible = false;
    }
  }

  ngOnInit() {}

  addCmpObj() {
    let currentValid = true;
    if (this.selectedCmpObj) {
      _.forIn(this.selectedCmpObj.attached.valid, validItem => {
        if (validItem !== true) {
          currentValid = false;
        }
      });
    }

    if (currentValid === true) {
      _.map(this.cmpObjs, cmpObj => (cmpObj.attached.active = false));

      const newObj = new CmpObj();
      newObj.attached.valid = {
        meta: false,
        dataRefer: false
      };
      newObj.attached.active = true;
      this.keynote.participants;
      _.map(this.keynote.participants, ms => {
        newObj.dataRefer.push({
          msId: ms._id,
          msName: ms.MDL.meta.name,
          eventName: undefined,
          data: {
            field: undefined
          },
          schema$: undefined
        });
      });
      this.cmpObjs = _.concat(newObj, this.cmpObjs);
      this.selectedCmpObj = newObj;

      //   console.log(this.cmpObjs);
    } else {
      this._notification.warning(
        'Warning',
        'Please accomplish the current comparison object first!'
      );
    }
  }

  checkAccordionValid(cmpObj) {
    if (cmpObj.meta.name && cmpObj.meta.desc) {
      cmpObj.attached.valid.meta = true;
    } else {
      cmpObj.attached.valid.meta = false;
    }

    if (cmpObj.schemaTypes.length !== 1) {
      cmpObj.attached.valid.schemaTypes = false;
    } else {
      cmpObj.attached.valid.schemaTypes = true;
    }

    if (
      _.filter(cmpObj.methods, method => method.checked === true).length > 0
    ) {
      cmpObj.attached.valid.methods = true;
    } else {
      cmpObj.attached.valid.methods = false;
    }

    let validDataRefer = true;
    _.map(cmpObj.dataRefer, dataRefer => {
      if (
        dataRefer.msId &&
        dataRefer.eventName &&
        dataRefer.msName &&
        dataRefer.data.field
      ) {
      } else {
        validDataRefer = false;
      }
    });
    cmpObj.attached.valid.dataRefer = validDataRefer;

    let currentValid = true;
    _.forIn(this.selectedCmpObj.attached.valid, validItem => {
      if (validItem !== true) {
        currentValid = false;
      }
    });
    if (currentValid) {
      this.propagateChange({
        valid: true,
        data: this.cmpObjs
      });
    } else {
      this.propagateChange({
        valid: false
      });
    }
  }

  showModal(cmpObj, msId) {
    this.selectedCmpObj = cmpObj;
    const selectedMS = _.cloneDeep(
      _.find(this.keynote.participants, ms => ms._id === msId)
    );
    selectedMS.MDL.IO.data = this.msService.UDXDataFilter(
      selectedMS,
      this.keynote.dimension
    );
    this.selectedMS = selectedMS;
    this.selectedMS.attached = {
      dimension: this.keynote.dimension
    };
    this.isModalVisible = true;
  }

  modalSubmit(cfg) {
    this.isModalVisible = false;
    _.map(this.selectedCmpObj.dataRefer, dataRefer => {
      if (dataRefer.msId === this.selectedMS._id) {
        dataRefer.eventName = cfg.eventName;
        dataRefer.data.field = cfg.fieldName;
        dataRefer.schema$ = cfg.schema$;
      }
    });

    if (_.indexOf(this.selectedCmpObj.schemaTypes, cfg.schema$.type) === -1) {
      this.selectedCmpObj.schemaTypes.push(cfg.schema$.type);
    }

    this.selectedCmpObj.methods = [];
    _.map(this.selectedCmpObj.schemaTypes, schemaType => {
      this.selectedCmpObj.methods = _.concat(
        this.selectedCmpObj.methods,
        CmpMethod.find(schemaType)
      );
    });

    this.checkAccordionValid(this.selectedCmpObj);
  }

  modalCancel() {
    this.isModalVisible = false;
  }

  private propagateChange = (e: any) => {};

  public writeValue(obj: any) {
    if (obj) {
      this.cmpObjs = obj;
    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() {}
}
