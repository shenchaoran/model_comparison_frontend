// 创建一个calculate instance
import {
    Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange,
    ChangeDetectionStrategy,
    forwardRef,
    ViewChild,
    AfterViewInit,
    HostListener,
    Inject,
} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { ResourceSrc, CalcuTask, CmpTask, CmpSolution } from '@models';
import { LoginService } from '@feature/login/login.service';
import { StdDataService } from '../../datasets/services/std-data.service';
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
/**
 * 有 read 和 write 两种模式
 * read:
 *      Input: IO, std
 *      Output: ngModel: { IO, std }
 * write:
 *      Input: IO, stdIds
 *      Output: ngModel: { IO, std }
 *
 * @export
 * @class CalcuCfgComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 * @implements {AfterViewInit}
 */
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
export class CalcuCfgComponent implements OnInit, OnChanges, AfterViewInit {
    _IO;
    _stds;

    _isVisible = false;

    IOForm: FormGroup;
    @Input() set IO(v) {
        this._IO = v;
        this.appendSchema();
        this.buildForm();
    }
    @Input() set stdIds(v) {
        this.fetchStds(v);
    }
    @Input() std;
    @Input() width = '350px';
    @Output() onValidChange = new EventEmitter<boolean>();

    fileUploaderOptions: NgUploaderOptions;

    constructor(
        @Inject('BACKEND') private backend,
        private loginService: LoginService,
        private fb: FormBuilder,
        private stdService: StdDataService
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
        // let changed;
        // _.forIn(changes, (v, k) => {
        //     if (!_.isEqual(v.currentValue, v.previousValue)) {
        //         changed = true;
        //     }
        // });
        // if (changed) {
        //     // this.title.setTitle(this.msInstance.meta.name);
        // }
    }

    fetchStds(stdIds) {
        this.stdService.fetchDbEntries(stdIds)
            .subscribe(response => {
                if (!response.error) {
                    this._stds = response.data;
                }
            })
    }

    ngAfterViewInit() {}

    ngOnInit() { }

    appendSchema() {
        let appendSchema = (type, schema) => {
            _.map(this._IO[type], event => {
                if (event.schemaId === schema.id) {
                    event.schema = schema;
                }
            });
        }
        _.map(this._IO.schemas, schema => {
            appendSchema('inputs', schema);
            appendSchema('std', schema);
            appendSchema('parameters', schema);
            appendSchema('outputs', schema);
        });
    }

    buildForm() {
        let myFormGroup = (event, type?) => {
            let gp = {
                id: [event.id],
                name: [event.name],
                description: [event.description],
                schema: [event.schema],
                optional: [event.optional],
                value: [type === 'outputs'? undefined: event.value, null],
                file: [undefined],
                fname: [type === 'outputs'? event.name: undefined],
                temp: [event.value, undefined],
                ext: [event.ext]
            };
            // if(type === 'inputs') {
            //     _.set(gp, 'file', [ undefined, Validators.required]);
            // }
            // else {
            //     _.set(gp, 'value', [event.value, Validators.required]);
            // }
            return this.fb.group(gp);
        }
        let inputCtrls = _.map(this._IO.inputs, item => myFormGroup(item, 'inputs'));
        let outputCtrls = _.map(this._IO.outputs, item => myFormGroup(item, 'outputs'));
        let stdCtrls = _.map(this._IO.std, item => myFormGroup(item, 'std'));
        let paraCtrls = _.map(this._IO.parameters, item => myFormGroup(item, 'parameters'));
        let dataSrc = this._IO.dataSrc === '' || !this._IO.dataSrc ? 'STD' : this._IO.dataSrc;
        this.IOForm = this.fb.group({
            dataSrc: [dataSrc, [Validators.required]],
            inputs: this.fb.array(inputCtrls),
            outputs: this.fb.array(outputCtrls),
            std: this.fb.array(stdCtrls),
            parameters: this.fb.array(paraCtrls),
            STD: ['', [Validators.required]]
        });
        this.changeValidate(dataSrc);
        this.IOForm.statusChanges
            // .filter(status => status === 'VALID')
            .subscribe(status => {
                // console.log(status);
                if(status === 'VALID') {
                    const dataSrc = this._IO.dataSrc = this.IOForm.value.dataSrc;
                    let setV = (tag) => {
                        this._IO[tag] = _.map(this.IOForm.value[tag], item => {
                            return {
                                id: item.id,
                                name: item.name,
                                description: item.description,
                                schemaId: _.get(item, 'schema.id'),
                                optional: item.optional,
                                cached: item.file? true: false,
                                value: (dataSrc === 'UPLOAD' && tag === 'inputs')? _.get(item, 'file.value'): 
                                        (tag === 'std' && item.id === '--index')? item.value: undefined,
                                fname: (dataSrc === 'UPLOAD' && tag === 'inputs')? _.get(item, 'file.fname'): item.fname,
                                ext: item.ext
                            };
                        });
                    }
                    setV('inputs');
                    setV('outputs');
                    setV('std');
                    setV('parameters');
                    this.std = this.IOForm.value.STD
                    // console.log(this._IO);
                    this.propagateChange({
                        IO: this._IO,
                        std: this.std
                    });
                }
                
                this.onValidChange.emit(status === 'VALID');
            });
    }

    download(url) {
        if(url === 'STD') {
            // TODO
            _.map(this._IO.inputs, (input, i) => {
                window.open(`http://${this.backend.host}:${this.backend.port}${this.backend.API_prefix}${input.url}`, i);
            })
        }
        else {
            window.open(`http://${this.backend.host}:${this.backend.port}${this.backend.API_prefix}${url}`);
        }
    }

    onSiteSelected(site) {
        let siteCtrl = _
            .chain((this.IOForm.get('std') as any).controls)
            .find(control => {
                return _.get(control, 'value.schema.structure.type')  === 'coordinate-index';
            })
            .value()
        
        // 这样更新好像不行，需要从叶节点更新
        // siteCtrl.value.temp = site
        // siteCtrl.value.value = site.index
        // siteCtrl.markAsDirty()
        // siteCtrl.updateValueAndValidity()
        
        // 手动设置表单项的值，并标记为脏的，触发验证
        // 注意，此处直接设置父表单项的值并触发验证不行，必须从叶节点开始
        let siteValueCtrl = siteCtrl.get('value')
        siteValueCtrl.value = site.index
        // siteValueCtrl.markAsDirty();
        siteValueCtrl.updateValueAndValidity();
        
        let tmpCtrl = siteCtrl.get('temp')
        tmpCtrl.value = site
        // tmpCtrl.markAsDirty();
        tmpCtrl.updateValueAndValidity();
    }

    modalOk() {
        this._isVisible = false;
    }

    /**
     * 两种验证器规则，需要动态更改：
     *      使用 输入数据时
     *      使用 标准数据集时
     * @param v 
     */
    changeValidate(v) {
        let rulesOfRequired = {
            UPLOAD: {
                std: {
                    value: false,
                    file: false,
                    fname: false,
                    temp: false
                },
                inputs: {
                    value: false,
                    file: true,
                    fname: false
                }
            },
            STD: {
                std: {
                    value: true,
                    file: false,
                    fname: false
                },
                inputs: {
                    value: false,
                    file: false,
                    fname: false
                }
            }
        }
        let updateValidity = (rules, tag) => {
            _.map((this.IOForm.get(tag) as any).controls, control => {
                for(let key in rules[tag]) {
                    let leafCtrl = control.get(key)
                    if(rules[tag][key]) {
                        leafCtrl.markAsPristine()
                        leafCtrl.setValidators(Validators.required)
                    }
                    else {
                        leafCtrl.clearValidators()
                        leafCtrl.value = undefined
                    }
                    leafCtrl.updateValueAndValidity()
                }
            })
        }
        updateValidity(rulesOfRequired[v], 'std')
        updateValidity(rulesOfRequired[v], 'inputs')
        if(v === 'UPLOAD') {
            let STDCtrl = this.IOForm.get('STD') as any
            STDCtrl.value = undefined
            STDCtrl.clearValidators()
            STDCtrl.updateValueAndValidity()
        }
    }

    private propagateChange = (e: any) => { };

    public writeValue(obj: any) {
        if (obj) {
            this._IO = obj;
            this.buildForm();
        }
    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any) { }
}
