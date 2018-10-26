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
    FormArray,
    Validators,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { CascaderSelectValidator } from '@shared/components/mat-cascader-select/cascader-select.validator';
import { Subject, combineLatest } from 'rxjs';

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
export class MatCascaderSelectComponent implements ControlValueAccessor, OnInit {
    selectsFG: FormGroup;

    _rst = [];
    _flapSource: {
        placeholder: String,
        value?: any,
        options: {
            label: String,
            value: String
        }[]
    }[];
    _source;

    get selectFCArray() {
        return (this.selectsFG.get('selects') as FormArray).controls;
    }

    @Input() options: {} = {};
    @Input() set source(v: CasCaderData) {
        this._source = v;
        this._flapSource = []
        let recurFlap = (src: CasCaderData, level) => {
            if(src.children) {
                this._flapSource.push({
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

        this.selectsFG = this.fb.group({
            selects: this.fb.array(_.map(this._flapSource, src => {
                return this.fb.control(null, Validators.required);
            }))
        });

        this.selectsFG.statusChanges
            .subscribe(state => {
                if(state === 'VALID') {
                    let v = _.map(this.selectsFG.value.selects, v => v.value);
                    this.propagateChange(v);
                }
            })
    }

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {}

    onSelected(e, level) {
        this._rst[level] = e.value;
        this._rst.splice(level+1);
        
        let getSubOptionsByRecur = (src, i) => {
            let newSrc = src.children[this._rst[i].index];
            if(i< level) {
                getSubOptionsByRecur(newSrc, i+1);
            }
            else if(newSrc && newSrc.children) {
                if(level < this._flapSource.length-1) {
                    this._flapSource[level+1].options = _.map(newSrc.children, child => {
                        return {
                            label: child.label,
                            value: child.value
                        };
                    });
                    let nextToClearCtrl = this.selectFCArray[level+1];
                    (nextToClearCtrl as any).value = null;
                    nextToClearCtrl.updateValueAndValidity();
                    nextToClearCtrl.markAsPristine();

                    let j = level+2;
                    while(j < this._flapSource.length) {
                        this._flapSource[j].options = null;
                        (this.selectFCArray[j] as any).value = null;
                        this.selectFCArray[j].updateValueAndValidity();
                        this.selectFCArray[j].markAsPristine();
                        j++;
                    }
                }
            }
        }
        
        getSubOptionsByRecur(this._source, 0)

        // if(level === this._flapSource.length -1) {
        //     this.propagateChange(_.map(this._rst, item => item.value));
        // }
    }

    private propagateChange = (e: any) => { };

    public writeValue(obj: any) {
        if (!obj) {
            obj = []
        }
        this._rst = obj;
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