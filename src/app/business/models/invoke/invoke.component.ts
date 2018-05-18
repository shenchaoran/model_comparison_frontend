import { Component, OnInit, HostListener } from "@angular/core";
import { MSService } from "../services/geo-models.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
// import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { LoginService } from '@feature/login/login.service';
import { ResourceSrc } from '@models';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'ogms-invoke',
    templateUrl: './invoke.component.html',
    styleUrls: ['./invoke.component.scss']
})
export class InvokeComponent implements OnInit {
    _isLoading = true;
    _width = '520px';

    modelId: string;
    model: any;

    msInstance;
    msiForm: FormGroup;

    constructor(
        private service: MSService,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private fb: FormBuilder,
        // private _notice: NzNotificationService,
        private title: DynamicTitleService
    ) { 
        let hasLogin = this.loginService.checkLogin();
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.modelId = params['id'];
            this.service.findOne(this.modelId)
                .subscribe(response => {
                    if (!response.error) {
                        let user = this.loginService.getUser();
                        this.model = response.data;
                        // this.title.setTitle(this.model.MDL.meta.name);
                        this.msInstance = this.service.newInstance(this.model);
                        this.msInstance.auth.src = '' + ResourceSrc.PUBLIC;
                        this.msInstance.cmpTaskId = undefined;
                        this.msInstance.auth.userId = user._id;
                        this.msInstance.auth.userName = user.username;

                        this.msiForm = this.fb.group({
                            _id: this.msInstance._id,
                            name: ['', Validators.required],
                            desc: ['', Validators.required],
                            src: [this.msInstance.auth.src, Validators.required],
                            IO: ['', Validators.required]
                        });
                        // this.msiForm.statusChanges
                        //     // .filter(status => status === 'VALID')
                        //     .subscribe(status => {
                        //         console.log(status);
                        //         console.log(this.msiForm);
                        //     });
                    }
                    this._isLoading = false;
                })
        });

    }

    invoke(type) {
        if (type === 'save') {
            this.msInstance.state = 0;
            this.msInstance.progress = 0;
        }
        else if (type === 'invoke') {
            this.msInstance.state = 1;
        }

        this.msInstance.meta.time = (new Date()).getTime();
        this.msInstance.meta.name = this.msiForm.value.name;
        this.msInstance.meta.desc = this.msiForm.value.desc;
        this.msInstance.auth.src = this.msiForm.value.src;
        this.msInstance.IO = this.msiForm.value.IO;

        console.log(this.msInstance);
        this.service.invoke(this.modelId, {
            msInstance: this.msInstance,
            type: type
        })
            .subscribe(response => {
                if(response.error) {

                }
                else {
                    let msrId = response.data;
                    // TODO
                }
            })
    }
}
