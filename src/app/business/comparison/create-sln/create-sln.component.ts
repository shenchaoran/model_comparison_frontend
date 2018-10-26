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

@Component({
    selector: 'ogms-create-sln',
    templateUrl: './create-sln.component.html',
    styleUrls: ['./create-sln.component.scss']
})

export class CreateSlnComponent implements OnInit {
    _title: string = 'Create a new comparison solution';
    _headerMeta: string = 'A comparison solution compare sereral factor of model.';
    _submitText: string = 'Create solution';

    get solution() { return this.solutionService.solution; }
    get cmpMethods() { return this.cmpMethodService.methods; }
    get mss() { return this.msService.mss; }


    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private solutionService: SolutionService,
        private msService: MSService,
        private cmpMethodService: CmpMethodService,
        private userService: UserService,
    ) {
        this.solutionService.create();
    }

    ngOnInit() {
    }

    onSubmit(e) {
        this.solution.auth.src = e.auth;
        this.solution.meta.name = e.name;
        this.solution.meta.desc = e.desc;
        this.solutionService.upsert().subscribe(res => { });
    }
}
