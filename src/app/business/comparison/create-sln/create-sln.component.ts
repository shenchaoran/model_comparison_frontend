import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CmpSolution, ResourceSrc } from '@models';
import { CmpSlnService } from '../services/cmp-sln.service';
import { MSService } from '../../models/services/geo-models.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import * as uuidv1 from 'uuid/v1';
import { CmpMethodService } from '../services/cmp-method.service';

@Component({
    selector: 'ogms-create-sln',
    templateUrl: './create-sln.component.html',
    styleUrls: ['./create-sln.component.scss']
})
export class CreateSlnComponent implements OnInit {
    _isMSListLoading: boolean = true;
    _doneDisabled: boolean = true;
    _isConfirmVisible: boolean = false;

    cmpMethods;
    slnFG: FormGroup;
    msList: any[];
    cmpSln: CmpSolution = new CmpSolution();
    get cmpObjs() {
        return this.slnFG.get('cmpObjs') as FormArray;
    }
    get participants() {
        return this.slnFG.get('participants');
    }
    get participantsNum() {
        let num = _.get(this.slnFG.get('participants'), 'value.length');
        return num ? num : 0;
    }

    constructor(
        private fb: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private service: CmpSlnService,
        private msService: MSService,
        private _notice: NzNotificationService,
        private router: Router,
        private route: ActivatedRoute,
        private cmpMethodService: CmpMethodService
    ) { }

    ngOnInit() {
        this.slnFG = this.fb.group({
            name: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
            desc: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(140)]],
            auth: ['Public', [Validators.required]],
            participants: [null, [Validators.required]],
            cmpObjs: this.fb.array([])
        });
        this.slnFG.statusChanges
            .subscribe(state => {
                if (state === 'VALID') {
                    let v = this.slnFG.value;
                    console.log(v);

                    this.cmpSln.meta.name = v.name;
                    this.cmpSln.meta.desc = v.desc;
                    this.cmpSln.auth.src = v.auth;
                    this.cmpSln.participants = v.participants;
                    this.cmpSln.cmpObjs = _.map(v.cmpObjs, cmpObj => {
                        return {
                            ...cmpObj,
                            dataRefers: _.map(cmpObj.dataRefers, dataRefer => {
                                return {
                                    msId: dataRefer.msId,
                                    msName: dataRefer.msName,
                                    eventId: dataRefer.selected[1],
                                    field: dataRefer.selected[2]
                                };
                            }),
                            methods: _.map(cmpObj.methods, method => method.id)
                        }
                    });
                }
            })

        this.fetchData();
    }

    onParticipantsChange() {
        this.cmpObjs;
        this.slnFG.setControl('cmpObjs', this.fb.array([]));
    }

    fetchData() {
        this.msService.findAll({
            pageSize: 100
        })
            .subscribe(response => {
                if (!response.error) {
                    this.msList = response.data.docs;
                    this._isMSListLoading = false;
                }
            });

        this.cmpMethodService.findAll({})
            .subscribe(response => {
                if (!response.error) {
                    this.cmpMethods = response.data.docs
                }
            })
    }


    addCmpObj() {
        this.cmpObjs.push(new FormControl({
            id: uuidv1()
        }));
        // this.cmpObjs.markAsDirty();
        this.cmpObjs.updateValueAndValidity();
    }

    removeCmpObj(index) {
        this.cmpObjs.removeAt(index);
        this.cmpObjs.updateValueAndValidity();
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
