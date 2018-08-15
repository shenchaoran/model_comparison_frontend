import {
    Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange,
    ChangeDetectionStrategy,
    forwardRef,
    ViewChild,
    AfterViewInit,
    HostListener,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
    selector: 'ogms-mat-cascader-select',
    templateUrl: './mat-cascader-select.component.html',
    styleUrls: ['./mat-cascader-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MatCascaderSelectComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatCascaderSelectComponent implements OnInit {
    _rst = [];
    _flapSource;
    _source;

    @Input() options: {} = {};
    @Input() set source(v: CasCaderData) {
        this._source = v;
        let rst = []
        function recurFlap(src: CasCaderData, level) {
            if(src.children) {
                rst.push({
                    placeholder: src.placeholder,
                    options: level === 1? _.map(src.children, child => {
                        return {
                            label: child.label,
                            value: child.value
                        };
                    }): null
                });
                recurFlap(src.children[0], level++)
            }
        }
        recurFlap(v, 1);
        this._flapSource = rst;
    }

    constructor() { }

    ngOnInit() {

    }

    onSelected(e, level) {
        this._rst[level] = e.value;
        this._rst.splice(level+1);
        
        let getSubOptionsByRecur = (src, i) => {
            let newSrc = src.children[this._rst[0].index];
            if(i< level) {
                getSubOptionsByRecur(newSrc, i+1);
            }
            else if(newSrc.children) {
                this._flapSource[level+1].options = _.map(newSrc.children, child => {
                    return {
                        label: child.label,
                        value: child.value
                    };
                });
                let j = level+2;
                while(this._flapSource[j]) {
                    this._flapSource[j].options = null;
                    j++;
                }
            }
        }
        getSubOptionsByRecur(this._source, 0)
        if(level === this._flapSource.length -1) {
            this.propagateChange(_.map(this._rst, item => item.value));
        }
    }

    private propagateChange = (e: any) => { };

    public writeValue(obj: any) {
        if (!obj) {
            obj = {}
        }
    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any) { }
}

export class CasCaderData {
    placeholder?: String;                  // placeholder
    label?: String;                 // 用户看到的选项值
    value?: any;                     // 携带的 value
    children?: CasCaderData[];      // 子选项
}