// 创建一个calculate instance
import {
    Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange,
    ChangeDetectionStrategy,
    forwardRef,
    ViewChild,
    AfterViewInit,
    HostListener,
    Inject,
    ChangeDetectorRef,
} from '@angular/core';
import { map, get } from 'lodash';
import { UploadCfg } from '@shared';
import { ResourceSrc, CalcuTask, Solution } from '@models';
import { DatasetService, UserService } from '@services';
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
import { timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadInput } from 'ngx-uploader';
import { chain, find,  } from 'lodash';

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
export class CalcuCfgComponent implements OnInit, AfterViewInit {
    _msInstance;
    stds;
    selectedSTD;

    IOForm: FormGroup;
    @Input() set msInstance(v) {
        this.init(v);
    }
    @Input() width = '350px';
    @Output() onValidChange = new EventEmitter<boolean>();
    @Output() onSiteSelected = new EventEmitter<boolean>();
    uploadInput: UploadInput;

    constructor(
        @Inject('BACKEND') private backend,
        private userService: UserService,
        private fb: FormBuilder,
        private datasetService: DatasetService,
        public dialog: MatDialog,
        public cdRef: ChangeDetectorRef,
    ) {
        const token = this.userService.token;
        const user = this.userService.user;

        this.uploadInput = {
            type: 'uploadAll',
            url: '/data',
            method: 'POST',
            data: {
                desc: '',
                src: ResourceSrc.EXTERNAL,
                userId: user._id
            },
            fieldName: 'geo-data',
            headers: {
                Authorization: 'bearer ' + token
            }
        };
    }

    init(v) {
        this._msInstance = v;
        this.fetchStds(v.ms.stdIds);
        this.appendSchema();
        this.buildForm();
        this.onValidChange.emit(false);
    }

    fetchStds(stdIds) {
        this.datasetService.fetchDbEntries(stdIds)
            .subscribe(response => {
                if (!response.error) {
                    this.stds = response.data;
                }
            })
    }

    ngAfterViewInit() { }

    ngOnInit() { }

    appendSchema() {
        let appendSchema = (type, schema) => {
            map(this._msInstance.IO[type] as any[], event => {
                if (event.schemaId === schema.id) {
                    event.schema = schema;
                }
            });
        }
        map(this._msInstance.IO.schemas, schema => {
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
                value: [type === 'outputs' ? undefined : event.value, null],
                file: [undefined],
                fname: [type === 'outputs' ? event.name : undefined],
                temp: [event.value, undefined],
                ext: [event.ext]
            };
            return this.fb.group(gp);
        }
        let inputCtrls = map(this._msInstance.IO.inputs, item => myFormGroup(item, 'inputs'));
        let outputCtrls = map(this._msInstance.IO.outputs, item => myFormGroup(item, 'outputs'));
        let stdCtrls = map(this._msInstance.IO.std, item => myFormGroup(item, 'std'));
        let paraCtrls = map(this._msInstance.IO.parameters, item => myFormGroup(item, 'parameters'));
        let dataSrc = this._msInstance.IO.dataSrc === '' || !this._msInstance.IO.dataSrc ? 'STD' : this._msInstance.IO.dataSrc;
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
            .pipe(
                debounce(() => timer(500))
            )
            .subscribe(status => {
                // console.log(status);
                if (status === 'VALID') {
                    const dataSrc = this._msInstance.IO.dataSrc = this.IOForm.value.dataSrc;
                    let setV = (tag) => {
                        this._msInstance.IO[tag] = map(this.IOForm.value[tag] as any[], item => {
                            return {
                                id: item.id,
                                name: item.name,
                                description: item.description,
                                schemaId: get(item, 'schema.id'),
                                optional: item.optional,
                                cached: item.file ? true : false,
                                value: (dataSrc === 'UPLOAD' && tag === 'inputs') ? get(item, 'file.value') :
                                    (tag === 'std' && item.id === '--index') ? item.value : undefined,
                                fname: (dataSrc === 'UPLOAD' && tag === 'inputs') ? get(item, 'file.fname') : item.fname,
                                ext: item.ext
                            };
                        });
                    }
                    setV('inputs');
                    setV('outputs');
                    setV('std');
                    setV('parameters');
                    this._msInstance.std = this.IOForm.value.STD;
                    this.propagateChange(this._msInstance);
                }
                else {
                    // this.propagateChange(null);
                    this.onValidChange.emit(false);
                }
            });
    }

    download(url) {
        if (url === 'STD') {
            // TODO
            map(this._msInstance.IO.inputs as any[], (input, i) => {
                window.open(`http://${this.backend.host}:${this.backend.port}${this.backend.API_prefix}${input.url}`);
            })
        }
        else {
            window.open(`http://${this.backend.host}:${this.backend.port}${this.backend.API_prefix}${url}`);
        }
    }

    onSuffixClick(e) {
        e.stopPropagation();
    }

    showSiteDialog() {
        this.dialog.open(SiteDialog)
            .afterClosed()
            .subscribe(site => {
                if (site) {
                    let siteCtrl = chain((this.IOForm.get('std') as any).controls)
                        .find(control => {
                            return get(control, 'value.schema.structure.type') === 'coordinate-index';
                        })
                        .value()

                    // 手动设置表单项的值，并标记为脏的，触发验证
                    // 注意，此处直接设置父表单项的值并触发验证不行，必须从叶节点开始
                    let siteValueCtrl = siteCtrl.get('value')
                    siteValueCtrl.setValue(site.index);
                    // siteValueCtrl.markAsDirty();
                    siteValueCtrl.updateValueAndValidity();

                    let tmpCtrl = siteCtrl.get('temp')
                    tmpCtrl.setValue(site);
                    // tmpCtrl.markAsDirty();
                    tmpCtrl.updateValueAndValidity();
                    // 手动更新，否则 label 总是不显示值
                    this.cdRef.markForCheck();
                    this.onSiteSelected.emit(site)
                }
            });
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
                },
                outputs: {
                    value: false,
                    file: false,
                    fname: true
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
                },
                outputs: {
                    value: false,
                    file: false,
                    fname: true
                }
            }
        }
        let rules = rulesOfRequired[v];
        for (let tag in rules) {
            map((this.IOForm.get(tag) as any).controls as any[], control => {
                for (let key in rules[tag]) {
                    let leafCtrl = control.get(key)
                    if (rules[tag][key]) {
                        leafCtrl.markAsPristine();
                        leafCtrl.setValidators(Validators.required)
                    }
                    else {
                        leafCtrl.clearValidators();
                    }
                    // leafCtrl.setValue(null);
                    leafCtrl.updateValueAndValidity()
                }
            });
        }
        // if (v === 'UPLOAD') {
        //     let STDCtrl = this.IOForm.get('STD') as any
        //     STDCtrl.setValue(null);
        //     STDCtrl.clearValidators()
        //     STDCtrl.updateValueAndValidity()
        // }
    }

    private propagateChange = (e: any) => { };

    public writeValue(obj: any) {
        if(obj)
            this.init(obj);
    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any) { }
}

@Component({
    selector: 'ogms-site-select-dialog',
    template: `
        <h2 mat-dialog-title>Select site to simulation</h2>
        <mat-dialog-content>
            <ogms-global-site (onSiteSelected)='onSiteSelected($event)'></ogms-global-site>
        </mat-dialog-content>
        <mat-dialog-actions align='end'>
            <div>
                <button mat-button (click)='onNoClick()'>Cancel</button>
                <button mat-button color='primary' (click)='onYesClick()' cdkFocusInitial [disabled]='!site'>OK</button>
            </div>
        </mat-dialog-actions>
    `
})
export class SiteDialog {
    site;
    constructor(public dialogRef: MatDialogRef<SiteDialog>) {
        this.dialogRef.beforeClose()
            .subscribe(v => {
                if (this.site) {
                    this.dialogRef.close(this.site);
                }
            })
    }

    onSiteSelected(e) {
        this.site = e;
    }

    onNoClick() {
        this.dialogRef.close();
    }

    onYesClick() {
        this.dialogRef.close(this.site)
    }
}