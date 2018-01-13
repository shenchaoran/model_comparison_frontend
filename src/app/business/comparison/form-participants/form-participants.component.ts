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
  ]
})
export class FormParticipantsComponent implements OnInit {
  @Output() onParticipantsChange = new EventEmitter<any>();
    selectedMS: Array<{
    msId: string,
    msName: string,
    nodeName: string,
	participate: boolean,
	data: any
  }> = [];
  originalMS = [];
  @Input() selectMode;

  __valid: boolean = false;

  _currentPage: number = 1;
  _total: number;
  _pageSize: number = 10;

  constructor(private route: ActivatedRoute, private modelService: MSService) {}

  ngOnInit() {
    this.route.data.subscribe(resolveData => {
	  _.map(this.modelService.convert2List(resolveData.geoModelTree), ms => {
		this.originalMS.push({
            ...(ms.value),
            value: ''
		});
	  });
	});
  }

//   ngOnChanges(changes: { [propName: string]: SimpleChange }) {
//     const knChange = changes['selectMode'];
//     if (!_.isEqual(knChange.currentValue, knChange.previousValue)) {
// 		this.__valid = false;
// 		this.selectedMS = [];
// 		_.map(this.originalMS, ms => {
// 			this.selectedMS.push({
// 				msId: ms.value._id,
//                 msName: ms.value.MDL.meta.name,
// 				nodeName: ms.value.auth.nodeName,
// 				value: '',
// 				data: ms.value
// 			})
// 		  });
//     }
//   }


onChecked() {
    this.selectedMS = _.chain(this.originalMS)
        .filter(ms => ms.value === true)
        .map(ms => {
            return {
                msId: ms._id,
                msName: ms.MDL.meta.name,
                nodeName: ms.auth.nodeName,
                participate: true,
			    data: ms
            };
        })
        .value();
        
    if(this.selectedMS.length) {
        this.__valid = true;
    }
    else {
        this.__valid = false;
    }
    this.onParticipantsChange.emit({
        participants: this.selectedMS,
        valid: this.__valid
    });
}

/**
 * deprecated
 */
  onCheckChange(value: string, index: number, e) {
	if(e === true) {
		if(this.selectMode === 'single') {
			_.map(this.originalMS, ms => ms.value = '');
		}
		this.originalMS[index].value = value;
		this.__valid = true;
	}
	else {
		this.originalMS[index].value = '';
		if(_.find(this.originalMS, ms => ms.value !== '') !== undefined) {
			this.__valid = true;
		}
		else {
			this.__valid = false;
		}
    }

    this.selectedMS = _.chain(this.originalMS)
        .filter(ms => ms.value !== '')
        .map(ms => {
            return {
                msId: ms._id,
                msName: ms.MDL.meta.name,
                nodeName: ms.auth.nodeName,
                participate: ms.value === 'Internal',
			    data: ms
            };
        })
        .value();
        
    this.onParticipantsChange.emit({
        participants: this.selectedMS,
        valid: this.__valid
    });
  }
}
