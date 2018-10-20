import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { MSService, UserService } from "../../services";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@common/core/services/dynamic-title.service";
import { ResourceSrc, CalcuTaskState, CalcuTask } from '@models';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    ValidatorFn,
} from '@angular/forms';
import { DocBaseComponent } from '@common/shared';

@Component({
    selector: 'ogms-invoke',
    templateUrl: './invoke.component.html',
    styleUrls: ['./invoke.component.scss']
})
export class InvokeComponent extends DocBaseComponent implements OnInit {
    _width = '520px';

    model: any;
    msInstance;
    msiForm: FormGroup;

    constructor(
        public route: ActivatedRoute,
        public slnService: MSService,
        //private _notice: NzNotificationService,
        public title: DynamicTitleService,
        public userService: UserService,
        public fb: FormBuilder,
        public router: Router
    ) {
        super(route, slnService, title);
        this.userService.redirectIfNotLogined();
    }

    ngOnInit() {
        super.ngOnInit();
        this._subscriptions.push(this.doc.subscribe(doc => {
            this.model = doc;
            // this.title.setTitle(this.model.MDL.meta.name);
            this.msInstance = new CalcuTask(this.userService.user, this.model);
            this.msInstance.cmpTaskId = undefined;

            this.msiForm = this.fb.group({
                _id: this.msInstance._id,
                name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
                desc: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(140)]],
                src: [ResourceSrc.PUBLIC, Validators.required],
                msInstance: [null, Validators.required]
            });
            this.msiForm.statusChanges
                // .filter(status => status === 'VALID')
                .subscribe(status => {
                    let hint = this.msInstanceValidator();
                    if(hint === null) {
                        if (status === 'VALID') {
                            this.msInstance.meta.name = this.msiForm.value['name'];
                            this.msInstance.meta.desc = this.msiForm.value['desc'];
                            this.msInstance.auth.src = this.msiForm.value.src;
                            this.msInstance.std = this.msiForm.value['msInstance'].std;
                            this.msInstance.IO = this.msiForm.value['msInstance'].IO;
                        }
                    }
                });
        }));
    }

    invoke(type) {
        if (type === 'save') {
            this.msInstance.state = CalcuTaskState.INIT;
        }
        else if (type === 'invoke') {
            this.msInstance.state = CalcuTaskState.COULD_START;
        }
        this._subscriptions.push(this.slnService.invoke(this.msInstance)
            .subscribe(response => {
                if (!response.error) {
                    let res = response.data;
                    if (res.code === 200)
                        this.router.navigate(['/results/calculation', res.msrId])
                }
            }));
    }

    onCalcuCfgChange(valid) {
        // TODO 自定义验证器
        // let ctrl = this.msiForm.get('msInstance');
        // ctrl.setErrors({'invalid': true});
        // ctrl.updateValueAndValidity();
        if(!valid)
            this.msiForm.setErrors({});
    }

    msInstanceValidator(): { [key: string]: any } | null {
        let ctrl = this.msiForm.get('msInstance');
        let isValid = true;
        let msInstance = ctrl.value;
        if(!ctrl || !msInstance) {
            isValid = false;
            return {};
        }
        if (msInstance.std && msInstance) {
            let dataSrc = msInstance.IO.dataSrc;
            for (let key in msInstance.IO) {
                if (!isValid)
                    break;
                for (let event of msInstance.IO[key]) {
                    if (!isValid)
                        break;

                    if (key === 'inputs') {
                        isValid = dataSrc === 'UPLOAD' ? Boolean(event.value && event.fname) : true;
                    }
                    else if (key === 'outputs') {
                        isValid = Boolean(event.fname);
                    }
                    else if (key === 'std') {
                        isValid = dataSrc === 'UPLOAD'? false:
                             event.id === '--index' ? Boolean(event.value) : true;
                    }
                    else if (key === 'parameters') {
                        // TODO
                    }
                }
            }
        }
        else {
            isValid = false;
        }

        if(isValid) {
            return null;
        }
        else {
            this.msiForm.setErrors({});
            return {
                'invalid-ms-invoke-config': msInstance
            };
        }
    }
}
