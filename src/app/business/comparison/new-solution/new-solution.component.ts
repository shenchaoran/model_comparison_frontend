import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '@feature/login/login.service';
import { CmpSolution, CmpTask, ResourceSrc } from '@models';
import { CmpSlnService } from '../services/cmp-sln.service';
import { NzNotificationService, NzModalService  } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ogms-new-solution',
    templateUrl: './new-solution.component.html',
    styleUrls: ['./new-solution.component.scss']
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSolutionComponent implements OnInit {
    form: FormGroup;

    currentStep = 0;
    cmpSolution: CmpSolution = new CmpSolution();
    cmpTask: CmpTask;

    __tempKeynote: any;

    nextDisabled: boolean = true;
    doneDisabled: boolean = true;

    __isConfirmVisible: boolean = false;

    constructor(
        private fb: FormBuilder,
        private _message: NzMessageService,
        private cdRef: ChangeDetectorRef,
        private service: CmpSlnService,
        private _notice: NzNotificationService,
        private modalService: NzModalService,
        private router: Router,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        this.form = this.fb.group({
            
        });
    }

    onKeynoteChange(e) {
        const user = LoginService.getUser();
        this.cmpSolution.cmpCfg.keynote = e;
        this.cmpSolution.cmpCfg.ms = _.map(e.participants, ms => {
            return {
                msId: ms._id, 
                nodeName: ms.auth.nodeName
            };
        });
        this.cmpSolution.meta = {
            name: e.attached.solutionMeta.name,
            desc: e.attached.solutionMeta.desc,
            time: (new Date()).getTime()
        };
        this.cmpSolution.auth = {
            userId: user._id,
            src: ResourceSrc.PRIVATE
        }
        // this.cdRef.markForCheck();
        // this.cdRef.detectChanges();

        if(this.cmpSolution.cmpCfg.keynote.dimension
            && this.cmpSolution.cmpCfg.keynote.direction
            && this.cmpSolution.cmpCfg.ms.length
            && this.cmpSolution.meta.name
            && this.cmpSolution.meta.desc) {
            this.nextDisabled = false;
        }
        else {
            this.nextDisabled = true;
            // this.nextDisabled = false;
        }
    }

    onCmpObjsChange(e) {
        if(e.valid) {
            this.cmpSolution.cmpCfg.cmpObjs = e.data;
            this.doneDisabled = false;
        }
        else {
            this.doneDisabled = true;
        }
    }

    changeStep(newStep) {
        if(this.currentStep < newStep) {
            this.nextDisabled = true;
            // this.nextDisabled = false;
        }
        else if(this.currentStep > newStep) {
            this.nextDisabled = false;
        }
        this.currentStep = newStep;

        this.__tempKeynote = _.cloneDeep(this.cmpSolution.cmpCfg.keynote);
    }

    done() {
        console.log(this.cmpSolution);
        this.service.insertSln(this.cmpSolution)
            .subscribe(response => {
                if(response.error) {
                    this._notice.warning('Warning', 'create comparison solution failed!');
                }
                else {
                    this._notice.success('Success', 'create comparison solution succeed!');
                    this.cmpSolution._id = response.data.doc._id;
                    this.__isConfirmVisible = true;
                    // this.modalService.confirm({
                    //     title: 'Configure this solution right now?',
                    //     onOk() {

                    //     },
                    //     onCancel() {

                    //     }
                    // });
                }
            });
        
    }

    handleCancel(e) {
        this.__isConfirmVisible = false;
    }

    handleOk(e) {
        this.__isConfirmVisible = true;
        this.router.navigate(['../..', 'tasks', 'new'], {
            relativeTo: this.route
        });
    }
}
