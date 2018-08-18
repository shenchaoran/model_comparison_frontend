import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { MSService } from "../services/geo-models.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@common/core/services/dynamic-title.service";
import { LoginService } from '@common/feature/login/login.service';
import { ResourceSrc, CalcuTaskState, CalcuTask } from '@models';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
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
        public service: MSService,
        //private _notice: NzNotificationService,
        public title: DynamicTitleService,
        public loginService: LoginService,
        public fb: FormBuilder,
        public router: Router
    ) {
        super(route, service, title);
        this.loginService.checkLogin();
    }

    ngOnInit() {
        super.ngOnInit();
        this._subscriptions.push(this.doc.subscribe(doc => {
            this.model = doc;
            // this.title.setTitle(this.model.MDL.meta.name);
            this.msInstance = new CalcuTask(this.model);
            this.msInstance.cmpTaskId = undefined;

            this.msiForm = this.fb.group({
                _id: this.msInstance._id,
                name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
                desc: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(140)]],
                src: [this.msInstance.auth.src, Validators.required],
                // TODO validator
                msInstance: [this.msInstance, Validators.required]
            });
            this.msiForm.statusChanges
                // .filter(status => status === 'VALID')
                .subscribe(status => {
                    if (status === 'VALID') {
                        this.msInstance.meta.name = this.msiForm.value['name'];
                        this.msInstance.meta.desc = this.msiForm.value['desc'];
                        this.msInstance.auth.src = this.msiForm.value.src;
                        this.msInstance.std = this.msiForm.value['msInstance'].std;
                        this.msInstance.IO = this.msiForm.value['msInstance'].IO;
                    }
                });
        }));
    }

    invoke(type) {
        if (type === 'save') {
            this.msInstance.state = CalcuTaskState.INIT;
        }
        else if (type === 'invoke') {
            this.msInstance.state = CalcuTaskState.START_PENDING;
        }
        this._subscriptions.push(this.service.invoke(this.msInstance)
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
        let ctrl = this.msiForm.get('msInstance');
        ctrl.markAsDirty();
        ctrl.updateValueAndValidity();
    }
}
