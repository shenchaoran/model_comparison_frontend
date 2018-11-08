import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { MSService, UserService } from "../../services";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ResourceSrc, CalcuTaskState, CalcuTask } from '@models';
import { filter } from 'rxjs/operators';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    ValidatorFn,
} from '@angular/forms';
import { OgmsBaseComponent } from '@shared';

@Component({
    selector: 'ogms-invoke',
    templateUrl: './invoke.component.html',
    styleUrls: ['./invoke.component.scss']
})
export class InvokeComponent extends OgmsBaseComponent implements OnInit {
    _width = '520px';

    ms: any;
    calcuTask;
    msiForm: FormGroup;

    constructor(
        public route: ActivatedRoute,
        public msService: MSService,
        public title: DynamicTitleService,
        public userService: UserService,
        public fb: FormBuilder,
        public router: Router
    ) {
        super();
    }

    ngOnInit() {
        this.msService.findOne(this.route.snapshot.paramMap.get('id')).subscribe(res => {
            if (!res.error) {
                this.ms = res.data.ms;
                this.calcuTask = new CalcuTask(this.userService.user, this.ms);
                this.calcuTask.stds = res.data.stds;

                this.msiForm = this.fb.group({
                    _id: this.calcuTask._id,
                    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
                    desc: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(140)]],
                    src: [ResourceSrc.PUBLIC, Validators.required],
                    calcuTask: [this.calcuTask, Validators.required]
                });
                this.msiForm.statusChanges.pipe(filter(v => v === 'VALID'))
                    .subscribe(status => {
                        let hint = this.msInstanceValidator();
                        if (hint === null) {
                            this.calcuTask.meta.name = this.msiForm.value['name'];
                            this.calcuTask.meta.desc = this.msiForm.value['desc'];
                            this.calcuTask.auth.src = this.msiForm.value.src;
                            this.calcuTask.stdId = this.msiForm.value['calcuTask'].stdId;
                            this.calcuTask.IO = this.msiForm.value['calcuTask'].IO;
                        }
                    });
            }
        });
    }

    invoke(type) {
        if (type === 'save') {
            this.calcuTask.state = CalcuTaskState.INIT;
        }
        else if (type === 'invoke') {
            this.calcuTask.state = CalcuTaskState.COULD_START;
        }
        this._subscriptions.push(this.msService.invoke(this.ms._id, this.calcuTask)
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
        // let ctrl = this.msiForm.get('calcuTask');
        // ctrl.setErrors({'invalid': true});
        // ctrl.updateValueAndValidity();
        if (!valid)
            this.msiForm.setErrors({});
    }

    msInstanceValidator(): { [key: string]: any } | null {
        let ctrl = this.msiForm.get('calcuTask');
        let isValid = true;
        let calcuTask = ctrl.value;
        if (!ctrl || !calcuTask) {
            isValid = false;
            return {};
        }
        if (calcuTask.stdId && calcuTask) {
            let dataSrc = calcuTask.IO.dataSrc;
            for (let key in calcuTask.IO) {
                if (!isValid)
                    break;
                for (let event of calcuTask.IO[key]) {
                    if (!isValid)
                        break;

                    if (key === 'inputs') {
                        isValid = dataSrc === 'UPLOAD' ? Boolean(event.value && event.fname) : true;
                    }
                    else if (key === 'outputs') {
                        isValid = Boolean(event.fname);
                    }
                    else if (key === 'std') {
                        isValid = dataSrc === 'UPLOAD' ? false :
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

        if (isValid) {
            return null;
        }
        else {
            this.msiForm.setErrors({});
            return {
                'invalid-ms-invoke-config': calcuTask
            };
        }
    }
}
