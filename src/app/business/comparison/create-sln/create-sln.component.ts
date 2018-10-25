import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Solution, Task, MS, ResourceSrc } from '@models';
import {
    SolutionService,
    UserService,
    CmpMethodService,
    MSService,
    TaskService,
    ConversationService,
} from '../../services';
import { Router, ActivatedRoute } from '@angular/router';
import * as uuidv1 from 'uuid/v1';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DefaultLifeHook } from '../../../common/shared/classes/default-life-hook.class';

@Component({
    selector: 'ogms-create-sln',
    templateUrl: './create-sln.component.html',
    styleUrls: ['./create-sln.component.scss']
})
export class CreateSlnComponent extends DefaultLifeHook implements OnInit {
    slnFG: FormGroup;

    get solution() { return this.solutionService.solution; }
    get cmpMethods() { return this.cmpMethodService.methods; }
    get mss() { return this.msService.mss; }
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
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private cdRef: ChangeDetectorRef,
        public dialog: MatDialog,
        private solutionService: SolutionService,
        private msService: MSService,
        private cmpMethodService: CmpMethodService,
        private userService: UserService,
    ) {
        super(solutionService);
        this.userService.redirectIfNotLogined();
        this.solutionService.create();
    }

    ngOnInit() {
        this.slnFG = this.fb.group({
            name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
            desc: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(140)]],
            auth: [ResourceSrc.PUBLIC, [Validators.required]],
            participants: [null, [Validators.required]],
            cmpObjs: this.fb.array([])
        });
        this.slnFG.statusChanges.subscribe(state => {
            // if (state === 'VALID') {
            let v = this.slnFG.value;
            this.solution.meta.name = v.name;
            this.solution.meta.desc = v.desc;
            this.solution.auth.src = v.auth;
            this.solution.participants = v.participants;
            this.solution.cmpObjs = _.map(v.cmpObjs, cmpObj => {
                return {
                    ...cmpObj,
                    dataRefers: _.map(cmpObj.dataRefers, dataRefer => {
                        return {
                            msId: dataRefer.msId,
                            msName: dataRefer.msName,
                            eventId: dataRefer.selected[1].id,
                            eventName: dataRefer.selected[1].name,
                            schemaId: dataRefer.selected[1].schemaId,
                            field: dataRefer.selected[2]
                        };
                    }),
                    methods: _.map(cmpObj.methods, method => {
                        return {
                            id: method._id,
                            name: method.meta.name
                        }
                    })
                }
            });
            // console.log(JSON.stringify(this.solution));
            // }
        })

        this.msService.findAll({ pageSize: 100 }).subscribe(response => { });
        this.cmpMethodService.findAll({}).subscribe(response => { })
    }

    onParticipantsChange() {
        this.cmpObjs;
        this.slnFG.setControl('cmpObjs', this.fb.array([]));
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

    submitSln() {
        this.solutionService.upsert().subscribe(res => {
            if (!res.error) {
                this.dialog.open(SlnConfirmDialog)
                    .afterClosed()
                    .subscribe(result => {
                        if (result === 'outline') {
                            this.router.navigate(['..', this.solution._id,], {
                                relativeTo: this.route
                            });
                        }
                        else if (result === 'configure') {
                            this.router.navigate(['/comparison/solutions', this.solution._id, 'invoke']);
                        }
                    });
            }
        });
    }
}

@Component({
    selector: 'ogms-sln-confirm-dialog',
    template: `
        <h2 mat-dialog-title>Configure this solution right now?</h2>
        <mat-dialog-content></mat-dialog-content>
        <mat-dialog-actions align='end'>
            <div>
                <button mat-button [mat-dialog-close]='"outline"'>Later</button>
                <button mat-button [mat-dialog-close]='"configure"' cdkFocusInitial>Configure</button>
            </div>
        </mat-dialog-actions>
    `
})
export class SlnConfirmDialog { }