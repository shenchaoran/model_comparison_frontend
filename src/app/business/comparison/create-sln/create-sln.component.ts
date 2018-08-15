import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmpSolution, CmpTask, ResourceSrc } from '@models';
import { CmpSlnService } from '../services/cmp-sln.service';
import { MSService } from '../../models/services/geo-models.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ogms-create-sln',
    templateUrl: './create-sln.component.html',
    styleUrls: ['./create-sln.component.scss']
})
export class CreateSlnComponent implements OnInit {
    _isMSListLoading: boolean = true;
    _doneDisabled: boolean = true;
    _isConfirmVisible: boolean = false;

    slnFG: FormGroup;
    msList: any[];
    cmpSln: CmpSolution = new CmpSolution();

    constructor(
        private fb: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private service: CmpSlnService,
        private msService: MSService,
        private _notice: NzNotificationService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.slnFG = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
            desc: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(140)]],
            auth: ['Public', [Validators.required]],
            msIds: [[], [Validators.required]],
            cmpObjs: [[], [Validators.required]]
        });

        this.msService.findAll({
            pageSize: 100
        })
            .subscribe(response => {
                if(!response.error) {
                    this.msList = response.data.docs;
                    this._isMSListLoading = false;
                }
            })
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
            this._doneDisabled = false;
        }
        else {
            this._doneDisabled = true;
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
                    this._isConfirmVisible = true;
                }
            });
    }

    handleCancel(e) {
        this._isConfirmVisible = false;
    }

    handleOk(e) {
        this._isConfirmVisible = true;
        localStorage.setItem('cmpSolution', JSON.stringify(this.cmpSln));
        this.router.navigate(['../..', 'tasks', 'new'], {
            relativeTo: this.route
        });
    }
}
