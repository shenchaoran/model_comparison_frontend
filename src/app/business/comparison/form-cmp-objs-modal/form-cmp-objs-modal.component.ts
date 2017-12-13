import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmpObj, MS } from '@models';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'ogms-form-cmp-objs-modal',
  templateUrl: './form-cmp-objs-modal.component.html',
  styleUrls: ['./form-cmp-objs-modal.component.scss']
})
export class FormCmpObjsModalComponent implements OnInit {
  _ms: MS;
  @Input()
  set ms(v: MS) {
    this.selectedEventName = undefined;
    this.selectedFieldName = undefined;
    this._eventList = undefined;
    this.selectedSchema = undefined;
    this.isValid = false;

    if (v !== undefined) {
      this._eventList = _.map(v.MDL.IO.data, item => {
        return {
          label: item.id,
          value: item
        };
      });
      this._ms = v;
    }
  }
  get ms() {
    return this._ms;
  }
  @Input()
  set showModal(v: boolean) {
    this.isModalVisible = v;
  }
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  isModalVisible: boolean;

  selectedEventName: string;
  selectedFieldName: string;

  selectedSchema: any;
  _eventList: any[];
  isValid: boolean = false;

  constructor(private _notification: NzNotificationService) {}

  ngOnInit() {}

  selectEvent(e) {
    const item = e.args.item;
    this.selectedSchema = _.find(
      this.ms.MDL.IO.schemas,
      schema => schema.id === item.value.schemaId
    );
    this.selectedEventName = item.value.id;
    
    if(this.ms.attached.dimension === 'polygon') {
        this.selectedFieldName = 'DEFAULT';
    }
    else if (this.ms.attached.dimension === 'point') {
        this.selectedFieldName = undefined;
    }
    
    this.checkModalValid();
  }

  checkModalValid() {
    if (this.ms && this.selectedEventName && this.selectedFieldName) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  handleCancel(e) {
    this.onCancel.emit();
    this.isModalVisible = false;
  }

  handleOk(e) {
    this.onSubmit.emit({
      eventName: this.selectedEventName,
      fieldName: this.selectedFieldName,
      schema$: this.selectedSchema
    });
    this.isModalVisible = false;
  }
}
