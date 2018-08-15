import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '@common/feature/login/login.service';
import { CmpSolution, CmpTask, ResourceSrc } from '@models';
import { CmpSlnService } from '../services/cmp-sln.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
    selector: 'ogms-create-sln',
    templateUrl: './create-sln.component.html',
    styleUrls: ['./create-sln.component.scss']
})
export class CreateSlnComponent implements OnInit {
    mode = 'write';
    currentStep = 0;
    cmpSln: CmpSolution = new CmpSolution();

    __tempKeynote: any;

    nextDisabled: boolean = true;
    doneDisabled: boolean = true;

    __isConfirmVisible: boolean = false;

    constructor(
        private fb: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private service: CmpSlnService,
        private _notice: NzNotificationService,
        private modalService: NzModalService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    onKeynoteChange(e) {
        const user = LoginService.getUser();
        this.cmpSln.cmpCfg.keynote = {
            direction: e.direction,
            dimension: e.dimension
        };
        this.cmpSln.meta = {
            name: e.attached.solutionMeta.name,
            desc: e.attached.solutionMeta.desc,
            time: (new Date()).getTime()
        };
        this.cmpSln.auth = {
            userId: user._id,
            userName: user.username,
            src: ResourceSrc.PRIVATE
        }

        if (this.cmpSln.cmpCfg.keynote.dimension
            && this.cmpSln.cmpCfg.keynote.direction
            && this.cmpSln.meta.name
            && this.cmpSln.meta.desc) {
            this.nextDisabled = false;
        }
        else {
            this.nextDisabled = true;
        }
    }

    onCmpObjsChange(e) {
        if (e.valid) {
            this.cmpSln.cmpCfg.cmpObjs = _.map(e.data, cmpObj => {
                const temp = _.cloneDeep(cmpObj);
                _.unset(temp, 'attached');
                _.unset(temp, 'cmpResults');
                _.unset(temp, 'dataRefers');
                return temp;
            });
            this.doneDisabled = false;
        }
        else {
            this.doneDisabled = true;
        }
    }

    changeStep(newStep) {
        if (this.currentStep < newStep) {
            this.nextDisabled = true;
            // this.nextDisabled = false;
        }
        else if (this.currentStep > newStep) {
            this.nextDisabled = false;
        }
        this.currentStep = newStep;

        if (newStep === 1) {
            this.__tempKeynote = _.cloneDeep(this.cmpSln.cmpCfg.keynote);
        }
    }

    done() {
        console.log(this.cmpSln);
        this.service.insert(this.cmpSln)
            .subscribe(response => {
                if (response.error) {
                    this._notice.warning('Warning', 'create comparison solution failed!');
                }
                else {
                    this._notice.success('Success', 'create comparison solution succeed!');
                    this.cmpSln._id = response.data.doc._id;
                    this.__isConfirmVisible = true;
                }
            });
    }

    handleCancel(e) {
        this.__isConfirmVisible = false;
    }

    handleOk(e) {
        this.__isConfirmVisible = true;
        localStorage.setItem('cmpSolution', JSON.stringify(this.cmpSln));
        this.router.navigate(['../..', 'tasks', 'new'], {
            relativeTo: this.route
        });
    }
}
