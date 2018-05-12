import { Component, OnInit, HostListener } from "@angular/core";
import { MSService } from "../services/geo-models.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
// import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { LoginService } from '@feature/login/login.service';
import { ResourceSrc } from '@models';

@Component({
    selector: 'ogms-invoke',
    templateUrl: './invoke.component.html',
    styleUrls: ['./invoke.component.scss']
})
export class InvokeComponent implements OnInit {
    _isLoading = true;
    _disableBtn = true;
    _width = '520px';

    modelId: string;
    model: any;

    msInstance;

    constructor(
        private service: MSService,
        private route: ActivatedRoute,
        private loginService: LoginService,
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
                    if (response.error) {
                        // this._notice.warning('Warning:', 'Get model failed');
                    }
                    else {
                        this.model = response.data;
                        this.title.setTitle(this.model.MDL.meta.name);
                        this.msInstance = this.service.newInstance(this.model);

                        this.msInstance.auth.src = '' + ResourceSrc.PUBLIC;
                        this.msInstance.cmpTaskId = undefined;

                    }
                    this._isLoading = false;
                })
        });

    }

    onInstanceChange(msInstance) {
        this.msInstance = msInstance;
        let valid = this.checkValid();
        this._disableBtn = !valid;
    }

    checkValid() {
        let valid = true;
        _.forIn(this.msInstance.meta, (v, k) => {
            if(v === undefined) {
                valid = false;
            }
        });
    }

    invoke(type) {
        if (type === 'save') {

        }
        else if (type === 'invoke') {

        }

        this.msInstance.meta.time = (new Date()).getTime();
        // TODO 检查

        let user = this.loginService.getUser();
        this.msInstance.auth.userId = user._id;
        this.msInstance.auth.userName = user.username;
    }
}
