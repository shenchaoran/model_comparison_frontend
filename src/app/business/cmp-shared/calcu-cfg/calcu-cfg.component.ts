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
                id: event.id,
                name: event.name,
                description: event.description,
                schema: event.schema,
                optional: event.optional,
                value: [event.value, Validators.required],
                temp: event.value,
                ext: event.ext
            })
        }
        let inputCtrls = _
            .chain(this._v.inputs)
            .map(myFormGroup)
            .value();
        let outputCtrls = _
            .chain(this._v.outputs)
            .map(myFormGroup)
            .value();
        let stdCtrls = _
            .chain(this._v.std)
            .map(myFormGroup)
            .value();
        let paraCtrls = _
            .chain(this._v.parameters)
            .map(myFormGroup)
            .value();
        this.IOForm = this.fb.group({
            dataSrc: ['STD', [Validators.required]],
            inputs: this.fb.array(inputCtrls),
            outputs: this.fb.array(outputCtrls),
            std: this.fb.array(stdCtrls),
            parameters: this.fb.array(paraCtrls)
        });
        this.changeValidate('STD');
        // console.log(this.IOForm);
        this.IOForm.statusChanges
            .filter(status => status === 'VALID')
            .subscribe(status => {
                // console.log(status);
                // console.log(this.IOForm);
                this._v.dataSrc = this.IOForm.value.dataSrc;
                let setV = (tag) => {
                    this._v[tag] = _.map(this.IOForm.value[tag], item => {
                        return {
                            id: item.id,
                            description: item.description,
                            schemaId: item.schema.id,
                            value: item.value,
                            ext: item.ext
                        };
                    });
                }
                setV('inputs');
                setV('outputs');
                setV('std');
                setV('parameters');
                
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
            requireCtrl = 'inputs';
        }
        else if(v === 'STD') {
            clearCtrl = 'inputs';
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
