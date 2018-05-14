// 创建一个calculate instance
import {
    Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange,
    ChangeDetectionStrategy,
    forwardRef,
    ViewChild,
} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { ResourceSrc, CalcuTask, CmpTask, CmpSolution } from '@models';
import { LoginService } from '@feature/login/login.service';
import { DynamicTitleService } from '@core/services/dynamic-title.service';
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
    selector: 'ogms-calcu-cfg',
    templateUrl: './calcu-cfg.component.html',
    styleUrls: ['./calcu-cfg.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CalcuCfgComponent),
            multi: true
        }
        // {
        //     provide: NG_VALIDATORS,
        //     useExisting: forwardRef(() => CalcuCfgComponent),
        //     multi: true
        // }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalcuCfgComponent implements OnInit, OnChanges {
    _v;
    @Input() set v(v) {
        this._v = v;
        this.buildForm();
    }

    IOForm: FormGroup;

    @Input() width = '350px';

    // @Output() onInstanceChange = new EventEmitter<any>();
    // @Output() onValidationChange = new EventEmitter<any>();

    fileUploaderOptions: NgUploaderOptions;

    constructor(
        private loginService: LoginService,
        private fb: FormBuilder,
        // private title: DynamicTitleService,
    ) {
        const token = this.loginService.getToken();
        const user = this.loginService.getUser();

        this.fileUploaderOptions = {
            url: '/data',
            data: {
                desc: '',
                src: ResourceSrc.EXTERNAL,
                userId: user._id
            },
            multiple: true,
            fieldName: 'geo-data',
            customHeaders: {
                Authorization:
                    'bearer ' + token
            }
        };
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        let changed;
        _.forIn(changes, (v, k) => {
            if (!_.isEqual(v.currentValue, v.previousValue)) {
                changed = true;
            }
        });
        if (changed) {
            // this.title.setTitle(this.msInstance.meta.name);
        }
    }

    ngOnInit() {}

    buildForm() {
        let myFormGroup = (event) => {
            return this.fb.group({
                id: [event.id],
                schema: [event.schema],
                optional: [event.optional],
                value: [event.value, Validators.required]
            })
        }
        let inputCtrls = _
            .chain(this._v.data)
            .filter(item => item.type === 'input')
            .map(myFormGroup)
            .value();
        let outputCtrls = _
            .chain(this._v.data)
            .filter(item => item.type === 'output')
            .map(myFormGroup)
            .value();
        let stdCtrls = _
            .chain(this._v.std)
            .map(myFormGroup)
            .value();
        let paraCtrls = _
            .chain(this._v.data)
            .filter(item => item.type === 'parameter')
            .map(myFormGroup)
            .value();
        this.IOForm = this.fb.group({
            dataSrc: ['STD', [Validators.required]],
            input: this.fb.array(inputCtrls),
            output: this.fb.array(outputCtrls),
            std: this.fb.array(stdCtrls),
            parameter: this.fb.array(paraCtrls)
        });
        this.changeValidate('STD');
        // console.log(this.IOForm);
        this.IOForm.statusChanges
            .filter(status => status === 'VALID')
            .subscribe(status => {
                // console.log(status);
                // console.log(this.IOForm);
                this._v.dataSrc = this.IOForm.value.dataSrc;
                this._v.data = _.concat(
                    _.map(this.IOForm.value.input, item => {
                        return {
                            id: item.id,
                            type: 'input',
                            description: '',
                            schemaId: item.schema.id,
                            value: item.value
                        };
                    }),
                    _.map(this.IOForm.value.parameter, item => {
                        return {
                            id: item.id,
                            type: 'parameter',
                            description: '',
                            schemaId: item.schema.id,
                            value: item.value
                        };
                    }),
                    _.map(this.IOForm.value.output, item => {
                        return {
                            id: item.id,
                            type: 'output',
                            description: '',
                            schemaId: item.schema.id,
                            value: item.value
                        };
                    })
                );
                this._v.std = _.map(this.IOForm.value.std, item => {
                    return {
                        id: item.id,
                        type: 'input',
                        description: '',
                        schemaId: item.schema.id,
                        value: item.value
                    };
                });
                this.propagateChange(this._v);
            });
    }

    /**
     * 改变验证器规则
     * @param v 
     */
    changeValidate(v) {
        // console.log(v);
        let clearCtrl;
        let requireCtrl;
        if(v === 'UPLOAD') {
            clearCtrl = 'std';
            requireCtrl = 'input';
        }
        else if(v === 'STD') {
            clearCtrl = 'input';
            requireCtrl = 'std';
        }
        _.map((this.IOForm.get(clearCtrl) as any).controls, control => {
            let leafCtrl = control.get('value');
            if(leafCtrl) {
                leafCtrl.clearValidators();
                leafCtrl.markAsPristine();
                leafCtrl.updateValueAndValidity();
            }
        });

        _.map((this.IOForm.get(requireCtrl) as any).controls, control => {
            let leafCtrl = control.get('value');
            if(leafCtrl) {
                leafCtrl.setValidators(Validators.required);
                leafCtrl.markAsDirty();
                leafCtrl.updateValueAndValidity();
            }
        });
    }

    // onCoordinateChange(v, event) {
    //     const match = v.match(/\s*\[?\s*(\d+\.?(\d+)?)\s*,\s*(\d+\.?(\d+)?)\s*\]?\s*/);
    //     if (match) {
    //         if (match.length === 5) {
    //             event.value = [match[1], match[3]];
    //         }
    //         else {
    //             event.value = [];
    //         }
    //     }
    // }

    // onParamRadioChange(event, shouldUpdate, opt) {
    //     // if(shouldUpdate) {
    //     event.value = opt;
    //     // }
    //     this.onInstanceChange.emit(this.msInstance);
    // }

    // onParamCheckboxChange(event, shouldPush, opt) {
    //     if (!event.value) {
    //         event.value = [];
    //     }
    //     if (shouldPush) {
    //         if (_.indexOf(event.value, opt) === -1) {
    //             event.value.push(opt);
    //         }
    //     }
    //     else {
    //         _.remove(event.value, opt);
    //     }
    //     this.onInstanceChange.emit(this.msInstance);
    // }

    // onOutputChange(event, e) {
    //     if (e === '' || e === undefined || e === null) {
    //         event.value = 'off';
    //     }
    //     this.onInstanceChange.emit(this.msInstance);
    // }

    // onDateChange(event, e) {
    //     event.value = e.getTime();
    //     this.onInstanceChange.emit(this.msInstance);
    // }


    private propagateChange = (e: any) => { };

    public writeValue(obj: any) {
        if (obj) {
            this._v = obj;
            this.buildForm();
        }
    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any) { }
}
