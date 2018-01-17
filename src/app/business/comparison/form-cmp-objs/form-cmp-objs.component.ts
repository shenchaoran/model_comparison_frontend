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
import * as uuidv1 from 'uuid/v1';
import { MS, CmpMethod, CmpObj, SchemaName } from '@models';
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
  ]
})
export class FormCmpObjsComponent implements OnInit, OnChanges {
    @Input() mode: 'write' | 'read' = 'read';
  @Output() onCmpObjsChange = new EventEmitter<any>();
  // TODO 根据 dimension 限制 schemaName 的范围
  @Input()
  keynote: {
    direction: 'x' | 'y';
    dimension: 'point' | 'polygon' | 'multi-point';
  };
  schemaNames: Array<string> = [];
  methods: Array<any> = [];

  @Input() cmpObjs: Array<CmpObj> = [];

  selectedCmpObj: CmpObj;

  constructor(
    private _notification: NzNotificationService,
    private msService: MSService,
    private cdRef: ChangeDetectorRef
  ) {
    _.forIn(SchemaName, (v, k) => {
      if (!/\d/.test(k)) {
        this.schemaNames.push(k);
      }
    });
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    const knChange = changes['keynote'];
    if (knChange) {
      if (!_.isEqual(knChange.currentValue, knChange.previousValue)) {
        this.cmpObjs = [];
        this.selectedCmpObj = undefined;
        // this.selectedMS = undefined;
        // this.isModalVisible = false;
      }
    }
  }

  ngOnInit() {}

  onSchemaChange(e, cmpObjId) {
    this.methods = CmpMethod.find(e);
    _.map(this.cmpObjs, cmpObj => {
      if (cmpObjId === cmpObj.id) {
        cmpObj.schemaName = e;
        cmpObj.methods = [];
        this.checkAccordionValid(cmpObj);
      }
    });
  }

  onMethodChange(e, cmpObjId) {
    _.map(this.cmpObjs, cmpObj => {
      if (cmpObj.id === cmpObjId) {
        _.map(e, method => {
          if (method.checked === true) {
            if (cmpObj.methods === undefined) {
              cmpObj.methods = [];
            }
            if(!_.find(cmpObj.methods, method.value)) {
                cmpObj.methods.push(method.value);
            }
            this.checkAccordionValid(cmpObj);
          }
        });
      }
    });
  }

  addCmpObj() {
    if (this.selectedCmpObj && this.selectedCmpObj.attached.valid || this.selectedCmpObj === undefined) {
      _.map(this.cmpObjs, cmpObj => (cmpObj.attached.active = false));

      const newObj = new CmpObj();
      this.cmpObjs = _.concat(newObj, this.cmpObjs);
      this.selectedCmpObj = newObj;
      this.methods = [];
    } else {
      this._notification.warning(
        'Warning',
        'Please accomplish the current comparison object first!'
      );
    }
  }

  removeCmpObj(id) {
    if (this.selectedCmpObj.id === id) {
      this.selectedCmpObj = undefined;
    }
    _.remove(this.cmpObjs, cmpObj => cmpObj.id === id);
    if (this.cmpObjs.length === 0) {
      this.onCmpObjsChange.emit({
        valid: false
      });
    }
  }

  checkAccordionValid(cmpObj) {
    if (
      !cmpObj.meta.name ||
      !cmpObj.meta.desc ||
      !cmpObj.schemaName ||
      cmpObj.methods.length === 0
    ) {
      cmpObj.attached.valid = false;
      this.onCmpObjsChange.emit({
        valid: false
      });
    } else {
      cmpObj.attached.valid = true;
      this.onCmpObjsChange.emit({
        valid: true,
        data: this.cmpObjs
      });
    }
  }

  //   showModal(cmpObj, msId) {
  //     this.selectedCmpObj = cmpObj;
  //     const selectedMS = _.cloneDeep(
  //       _.find(this.participants, ms => ms._id === msId)
  //     );
  //     selectedMS.MDL.IO.data = this.msService.UDXDataFilter(
  //       selectedMS,
  //       this.keynote.dimension
  //     );
  //     this.selectedMS = selectedMS;
  //     this.selectedMS.attached = {
  //       dimension: this.keynote.dimension
  //     };
  //     this.isModalVisible = true;
  //   }

  //   modalSubmit(cfg) {
  //     this.isModalVisible = false;
  //     _.map(this.selectedCmpObj.dataRefers, dataRefer => {
  //       if (dataRefer.msId === this.selectedMS._id) {
  //         dataRefer.eventName = cfg.eventName;
  //         dataRefer.data.field = cfg.fieldName;
  //         dataRefer.schema$ = cfg.schema$;
  //       }
  //     });

  //     if (_.indexOf(this.selectedCmpObj.schemaTypes, cfg.schema$.type) === -1) {
  //       this.selectedCmpObj.schemaTypes.push(cfg.schema$.type);
  //     }

  //     this.selectedCmpObj.methods = [];
  //     _.map(this.selectedCmpObj.schemaTypes, schemaType => {
  //       this.selectedCmpObj.methods = _.concat(
  //         this.selectedCmpObj.methods,
  //         CmpMethod.find(schemaType)
  //       );
  //     });

  //     this.checkAccordionValid(this.selectedCmpObj);
  //   }

  //   modalCancel() {
  //     this.isModalVisible = false;
  //   }

  //   private propagateChange = (e: any) => {};

  //   public writeValue(obj: any) {
  //     if (obj) {
  //       this.cmpObjs = obj;
  //     }
  //   }

  //   public registerOnChange(fn: any) {
  //     this.propagateChange = fn;
  //   }

  //   public registerOnTouched() {}
}
