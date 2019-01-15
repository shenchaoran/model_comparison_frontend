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
import { NgModelBase } from '@shared';

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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalcuCfgComponent extends NgModelBase implements OnInit, AfterViewInit {
    get calcuTask() { return this.value; }

    IOForm: FormGroup;
    @Input() set calcuTask(v) {
        this._innerValue = v;
        this._innerValue$.next(v);
    }
    @Input() width = '350px';
    @Output() onValidChange = new EventEmitter<boolean>();
    uploadInput: UploadInput;

    constructor(
        @Inject('API') private api,
        private userService: UserService,
        private fb: FormBuilder,
        public dialog: MatDialog,
        public cdRef: ChangeDetectorRef,
    ) {
        super();

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

        this._innerValue$.subscribe(v => {
            this.init();
        })
    }

    init() {
        this.buildForm();
        this.onValidChange.emit(false);
    }

    ngAfterViewInit() { }

    ngOnInit() { }

    buildForm() {
        let myFormGroup = (event, type?) => {
            let eventFG = {
                id: [event.id],
                name: [event.name],
                description: [event.description],
                schemaId: [event.schemaId],
                optional: [event.optional],
                value: [type === 'outputs' ? undefined : event.value, null],
                file: [undefined],
                fname: [type === 'outputs' ? event.name : undefined],
                temp: [event.value, undefined],
                ext: [event.ext]
            };
            return this.fb.group(eventFG);
        }
        let inputCtrls = map(this.calcuTask.IO.inputs, item => myFormGroup(item, 'inputs'));
        let outputCtrls = map(this.calcuTask.IO.outputs, item => myFormGroup(item, 'outputs'));
        let stdCtrls = map(this.calcuTask.IO.std, item => myFormGroup(item, 'std'));
        let paraCtrls = map(this.calcuTask.IO.parameters, item => myFormGroup(item, 'parameters'));
        let dataSrc = this.calcuTask.IO.dataSrc === '' || !this.calcuTask.IO.dataSrc ? 'STD' : this.calcuTask.IO.dataSrc;
        this.IOForm = this.fb.group({
            dataSrc: [dataSrc, [Validators.required]],
            inputs: this.fb.array(inputCtrls),
            outputs: this.fb.array(outputCtrls),
            std: this.fb.array(stdCtrls),
            parameters: this.fb.array(paraCtrls),
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
                    const dataSrc = this.calcuTask.IO.dataSrc = this.IOForm.value.dataSrc;
                    let keys = ['inputs', 'outputs', 'parameters', 'std']
                    for(let key of keys) {
                        this.calcuTask.IO[key] = _.map(this.IOForm.value[key] as any[], event => {
                            // if(key === 'std')
                            //     event
                            return {
                                id: event.id,
                                name: event.name,
                                description: event.description,
                                schemaId: event.schemaId,
                                optional: event.optional,
                                cached: event.file ? true : false,
                                value: (dataSrc === 'UPLOAD' && key === 'inputs') ? get(event, 'file.value') :
                                    key === 'std' ? event.value : undefined,
                                fname: (dataSrc === 'UPLOAD' && key === 'inputs') ? get(event, 'file.fname') : event.fname,
                                ext: event.ext
                            }
                        })
                    }
                    this.propagateChange(this.calcuTask);
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
            map(this.calcuTask.IO.inputs as any[], (input, i) => {
                window.open(`${this.api.backend}${input.url}`);
            })
        }
        else {
            window.open(`${this.api.backend}${url}`);
        }
    }

    onSuffixClick(e) {
        e.stopPropagation();
    }

    showSiteDialog() {
        this.dialog.open(SiteDialog)
            .afterClosed()
            .subscribe(sitesForm => {
                if(!sitesForm || !sitesForm.valid)
                    return;
                let sites = sitesForm.value
                if (sites) {
                    let siteCtrl = chain((this.IOForm.get('std') as any).controls)
                        .find(control => {
                            return get(control, 'value.schemaId') === 'coordinate-index';
                        })
                        .value()

                    // 手动设置表单项的值，并标记为脏的，触发验证
                    // 注意，此处直接设置父表单项的值并触发验证不行，必须从叶节点开始
                    let siteValueCtrl = siteCtrl.get('value')
                    siteValueCtrl.setValue(sites[0].index);
                    // siteValueCtrl.markAsDirty();
                    siteValueCtrl.updateValueAndValidity();

                    let tmpCtrl = siteCtrl.get('temp')
                    tmpCtrl.setValue(sites[0]);
                    // tmpCtrl.markAsDirty();
                    tmpCtrl.updateValueAndValidity();
                    // 手动更新，否则 label 总是不显示值
                    this.cdRef.markForCheck();
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
}

@Component({
    selector: 'ogms-site-select-dialog',
    template: `
        <h2 mat-dialog-title>Select site to simulation</h2>
        <mat-dialog-content>
            <ogms-grid-site [onlyMap]='true' [multiple]='false' [couldSelect]='true' (onSitesChange)='onSitesChange($event)'></ogms-grid-site>
        </mat-dialog-content>
        <mat-dialog-actions align='end'>
            <div>
                <button mat-button (click)='onNoClick()'>Cancel</button>
                <button mat-button color='primary' (click)='onYesClick()' cdkFocusInitial [disabled]='!sitesForm || !sitesForm.valid'>OK</button>
            </div>
        </mat-dialog-actions>
    `,
    styles: [
        `:host { width: 650px; } >*{width: 650px; }`
    ]
})
export class SiteDialog {
    sitesForm;
    constructor(public dialogRef: MatDialogRef<SiteDialog>) {
        this.dialogRef.beforeClose()
            .subscribe(v => {
                if (this.sitesForm) {
                    this.dialogRef.close(this.sitesForm);
                }
            })
    }

    onSitesChange(e) {
        this.sitesForm = e;
    }

    onNoClick() {
        this.dialogRef.close();
    }

    onYesClick() {
        this.dialogRef.close(this.sitesForm)
    }
}