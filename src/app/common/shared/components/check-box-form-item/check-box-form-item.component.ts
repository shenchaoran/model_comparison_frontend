
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    forwardRef,
    Input,
    Output,
    ViewChild,
    EventEmitter
} from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
    selector: 'ogms-check-box-form-item',
    templateUrl: './check-box-form-item.component.html',
    styleUrls: ['./check-box-form-item.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckBoxFormItemComponent),
            multi: true
        }
        // {
        //     provide: NG_VALIDATORS,
        //     useExisting: forwardRef(() => CheckBoxFormItemComponent),
        //     multi: true
        // }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckBoxFormItemComponent implements OnInit {
    // v 是选中的option value 数组
    v;
    _checkOpts = [];
    @Input() set checkOpts(v) {
        this._checkOpts = _.map(v, item => {
            return {
                label: item,
                value: item,
                checked: false
            };
        })
    }
    @Input() width;

    constructor() { }

    ngOnInit() {
    }

    emitChange() {
        this.v = _
            .chain(this._checkOpts)
            .filter(item => !!item.checked)
            .map(item => item.value)
            .value();

        this.propagateChange(this.v);
    }

    private propagateChange = (e: any) => { };

    public writeValue(obj: any) {
        if (obj) {
            this.v = obj;
        }
    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any) { }
}
