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
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import * as uuidv1 from 'uuid/v1';
declare const ol: any;
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
export class CalcuCfgComponent implements OnInit, OnChanges, AfterViewInit {
    _v;
    _isVisible = false;
    firstClick = true;
    mapDivID = uuidv1();
    map;

    IOForm: FormGroup;
    @Input() set v(v) {
        this._v = v;
        this.appendSchema();
        if (this._v.mode !== 'read') {
            this.buildForm();
        }
    }
    @Input() mode: 'read' | 'write' = 'write';
    @Input() width = '350px';
    @Output() onValidChange = new EventEmitter<boolean>();

    fileUploaderOptions: NgUploaderOptions;

    constructor(
        @Inject('BACKEND') private backend,
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

    ngAfterViewInit() {

    }

    buildMap() {
        if (this.firstClick) {
            this.firstClick = false;
            // setTimeout(() => {
            console.log(jQuery(`#${this.mapDivID}`).length);

            this.map = new ol.Map({
                target: this.mapDivID,
                layers: [new ol.layer.Group({
                    title: 'Base',
                    layers: [
                        new ol.layer.Tile({
                            title: 'OSM',
                            visible: true,
                            source: new ol.source.OSM()
                        })
                    ]
                })],
                view: new ol.View({
                    center: [0, 0],
                    zoom: 4
                }),
                controls: ol.control
                    .defaults({
                        attribution: false,
                        rotate: false,
                        zoom: false
                    })
                    .extend([
                        new ol.control.FullScreen(),
                        new ol.control.ScaleLine()
                    ])
            });
            // }, 0);
        }
        this._isVisible = true;
    }

    ngOnInit() { }

    appendSchema() {
        _.map(this._v.schemas, schema => {
            let appendSchema = (type) => {
                _.map(this._v[type], event => {
                    if (event.schemaId === schema.id) {
                        event.schema = schema;
                    }
                });
            }
            appendSchema('inputs');
            appendSchema('std');
            appendSchema('parameters');
            appendSchema('outputs');
        });
    }

    buildForm() {
        let myFormGroup = (event, type?) => {
            let gp = {
                id: event.id,
                name: event.name,
                description: event.description,
                schema: event.schema,
                optional: event.optional,
                value: event.value,
                file:  undefined,
                temp: event.value,
                ext: event.ext
            };
            // if(type === 'inputs') {
            //     _.set(gp, 'file', [ undefined, Validators.required]);
            // }
            // else {
            //     _.set(gp, 'value', [event.value, Validators.required]);
            // }
            return this.fb.group(gp);
        }
        let inputCtrls = _
            .chain(this._v.inputs)
            .map(item => myFormGroup(item, 'inputs'))
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
            dataSrc: [this._v.dataSrc === '' || !this._v.dataSrc ? 'STD' : this._v.dataSrc, [Validators.required]],
            inputs: this.fb.array(inputCtrls),
            outputs: this.fb.array(outputCtrls),
            std: this.fb.array(stdCtrls),
            parameters: this.fb.array(paraCtrls)
        });
        this.changeValidate('STD');
        // console.log(this.IOForm);
        this.IOForm.statusChanges
            // .filter(status => status === 'VALID')
            .subscribe(status => {
                // console.log(status);
                // console.log(this.IOForm);
                if(status === 'VALID') {
                    const dataSrc = this._v.dataSrc = this.IOForm.value.dataSrc;
                    let setV = (tag) => {
                        this._v[tag] = _.map(this.IOForm.value[tag], item => {
                            return {
                                id: item.id,
                                name: item.name,
                                description: item.description,
                                schemaId: item.schema.id,
                                optional: item.optional,
                                // value: item.value,
                                value: (dataSrc === 'UPLOAD' && tag === 'inputs')? item.file.value: item.value,
                                fname: (dataSrc === 'UPLOAD' && tag === 'inputs')? item.file.fname: undefined,
                                ext: item.ext
                            };
                        });
                    }
                    setV('inputs');
                    setV('outputs');
                    setV('std');
                    setV('parameters');
                    console.log(this._v);
                    this.propagateChange(this._v);
                }
                
                this.onValidChange.emit(status === 'VALID');
            });
    }

    download(url) {
        if(url === 'STD') {
            // TODO
            _.map(this._v.inputs, (input, i) => {
                window.open(`http://${this.backend.host}:${this.backend.port}${input.url}`, i);
            })
        }
        else {
            window.open(`http://${this.backend.host}:${this.backend.port}${url}`);
        }
    }

    modalCancel() {
        this._isVisible = false;
    }

    modalOk() {
        this._isVisible = false;
    }

    onMouseWheel(e) {
        // console.log(e);
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
    }

    @HostListener('window:resize')
    resize() {
        if(this.map) {
            this.map.updateSize();
        }
    }

    /**
     * 改变验证器规则
     * @param v 
     */
    changeValidate(v) {
        if (v === 'UPLOAD') {
            _.map((this.IOForm.get('std') as any).controls, control => {
                let leafCtrl = control.get('file');
                if (leafCtrl) {
                    leafCtrl.clearValidators();
                    leafCtrl.markAsPristine();
                    leafCtrl.updateValueAndValidity();
                }
                leafCtrl = control.get('value');
                if (leafCtrl) {
                    leafCtrl.clearValidators();
                    leafCtrl.markAsPristine();
                    leafCtrl.updateValueAndValidity();
                }
            });
            _.map((this.IOForm.get('inputs') as any).controls, control => {
                let leafCtrl = control.get('value');
                if (leafCtrl) {
                    leafCtrl.clearValidators();
                    leafCtrl.markAsPristine();
                    leafCtrl.updateValueAndValidity();
                }
                leafCtrl = control.get('file');
                if (leafCtrl) {
                    leafCtrl.setValidators(Validators.required);
                    leafCtrl.markAsDirty();
                    leafCtrl.updateValueAndValidity();
                }
            });

        }
        else if (v === 'STD') {
            _.map((this.IOForm.get('inputs') as any).controls, control => {
                let leafCtrl = control.get('file');
                if (leafCtrl) {
                    leafCtrl.clearValidators();
                    leafCtrl.markAsPristine();
                    leafCtrl.updateValueAndValidity();
                }
                leafCtrl = control.get('value');
                if (leafCtrl) {
                    leafCtrl.clearValidators();
                    leafCtrl.markAsPristine();
                    leafCtrl.updateValueAndValidity();
                }
            });
            _.map((this.IOForm.get('std') as any).controls, control => {
                let leafCtrl = control.get('value');
                if (leafCtrl) {
                    leafCtrl.setValidators(Validators.required);
                    leafCtrl.markAsDirty();
                    leafCtrl.updateValueAndValidity();
                }
                leafCtrl = control.get('file');
                if (leafCtrl) {
                    leafCtrl.clearValidators();
                    leafCtrl.markAsPristine();
                    leafCtrl.updateValueAndValidity();
                }
            });
        }
        _.map((this.IOForm.get('outputs') as any).controls, control => {
            let leafCtrl = control.get('value');
            if (leafCtrl) {
                leafCtrl.setValidators(Validators.required);
                leafCtrl.markAsDirty();
                leafCtrl.updateValueAndValidity();
            }
        });
        // TODO 触发验证
        this.IOForm.get('std').updateValueAndValidity();
        this.IOForm.get('inputs').updateValueAndValidity();
        this.IOForm.get('outputs').updateValueAndValidity();
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
