import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  forwardRef,
  Input,
  Output,
  ViewChild,
  OnChanges,
  SimpleChange,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MSService } from '../../geo-model/services';

@Component({
  selector: 'ogms-form-participants',
  templateUrl: './form-participants.component.html',
  styleUrls: ['./form-participants.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormParticipantsComponent),
      multi: true
    }
    // {
    //     provide: NG_VALIDATORS,
    //     useExisting: forwardRef(() => FormParticipantsComponent),
    //     multi: true
    // }
  ]
})
export class FormParticipantsComponent implements OnInit, OnChanges {
  selectedMS: Array<{
    msId: string,
    nodeName: string,
	value: string,
	data: any
  }> = [];
  originalMS;
  @Input() selectMode;

  __valid: boolean;

  _currentPage: number = 1;
  _total: number;
  _pageSize: number = 10;

  private propagateChange = (e: any) => {};

  constructor(private route: ActivatedRoute, private modelService: MSService) {}

  ngOnInit() {
    this.route.data.subscribe(resolveData => {
	  this.originalMS = this.modelService.convert2List(resolveData.geoModelTree);
	  _.map(this.originalMS, ms => {
		this.selectedMS.push({
			msId: ms.value._id,
			nodeName: ms.value.auth.nodeName,
			value: '',
			data: ms.value
		})
	  });
	});
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    const knChange = changes['selectMode'];
    if (!_.isEqual(knChange.currentValue, knChange.previousValue)) {
		this.__valid = false;
		this.selectedMS = [];
		_.map(this.originalMS, ms => {
			this.selectedMS.push({
				msId: ms.value._id,
				nodeName: ms.value.auth.nodeName,
				value: '',
				data: ms.value
			})
		  });
    }
  }

  onCheckChange(value: string, index: number, e) {
	if(e === true) {
		if(this.selectMode === 'single') {
			_.map(this.selectedMS, ms => ms.value = '');
		}
		this.selectedMS[index].value = value;
		this.__valid = true;
	}
	else {
		this.selectedMS[index].value = '';
		if(_.find(this.selectedMS, ms => ms.value !== '') !== undefined) {
			this.__valid = true;
		}
		else {
			this.__valid = false;
		}
	}
	this.emitNgModelChange();
  }

  emitNgModelChange() {
	const msList = _.filter(this.selectedMS, ms => ms.value !== '');
	this.propagateChange({
		participants: msList,
		valid: this.__valid
	});
  }

  public writeValue(obj: any) {
    if (obj) {
    }
  }

  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() {}
}
