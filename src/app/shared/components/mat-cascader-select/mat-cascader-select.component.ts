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
import { debounceTime, throttleTime } from 'rxjs/operators';
import { map, get } from 'lodash';

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

    _flapOptions: {
        placeholder: String,
        value?: any,
        options: {
            label: String,
            value: String
        }[]
    }[];

    _options;
    _value = [];
    options$ = new Subject<any>();
    value$ = new Subject<any>();

    get selectFCArray() { return (this.selectsFG.get('selects') as FormArray).controls; }

    @Input() set options(v: CasCaderData) {
        this.options$.next(v);
    }

    constructor(
        private fb: FormBuilder
    ) {
        combineLatest(this.options$, this.value$).subscribe(v => {
            this._options = v[0];
            this._value = v[1];

            this._flapOptions = []
            let recurFlap = (src: CasCaderData, level) => {
                if (src && src.children) {
                    this._flapOptions.push({
                        placeholder: src.placeholder,
                        options: level === 1 ? map(src.children as any[], child => {
                            return {
                                label: child.label,
                                value: child.value
                            };
                        }) : null
                    });
                    recurFlap(src.children[0], level++)
                }
            }
            recurFlap(this._options, 1);

            this.selectsFG = this.fb.group({
                selects: this.fb.array(map(this._flapOptions as any[], (src, i) => {
                    return this.fb.control(get(this._value, i), Validators.required);
                }))
            });
            console.log(this._flapOptions, this.selectsFG.value);

            this.selectsFG.statusChanges.subscribe(state => {
                if (state === 'VALID') {
                    let v = map(this.selectsFG.value.selects as any[], v => v.value);
                    this.propagateChange(v);
                }
            });
        })
    }

    ngOnInit() { }

    onSelected(e, level) {
        this._value[level] = e.value;
        this._value.splice(level + 1);

        let getSubOptionsByRecur = (src, i) => {
            let newSrc = src.children[this._value[i].index];
            if (i < level) {
                getSubOptionsByRecur(newSrc, i + 1);
            }
            else if (newSrc && newSrc.children) {
                if (level < this._flapOptions.length - 1) {
                    this._flapOptions[level + 1].options = map(newSrc.children as any[], child => {
                        return {
                            label: child.label,
                            value: child.value
                        };
                    });
                    let nextToClearCtrl = this.selectFCArray[level + 1];
                    (nextToClearCtrl as any).value = null;
                    nextToClearCtrl.updateValueAndValidity();
                    nextToClearCtrl.markAsPristine();

                    let j = level + 2;
                    while (j < this._flapOptions.length) {
                        this._flapOptions[j].options = null;
                        (this.selectFCArray[j] as any).value = null;
                        this.selectFCArray[j].updateValueAndValidity();
                        this.selectFCArray[j].markAsPristine();
                        j++;
                    }
                }
            }
        }

        getSubOptionsByRecur(this._options, 0)

        // if(level === this._flapOptions.length -1) {
        //     this.propagateChange(map(this._value as any[], item => item.value));
        // }
    }

    private propagateChange = (e: any) => { };

    public writeValue(obj: any) {
        if (!obj) {
            obj = []
        }
        this.value$.next(obj);
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