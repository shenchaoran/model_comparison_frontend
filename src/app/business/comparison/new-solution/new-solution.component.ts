import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CmpSolution, CmpTask } from '@models';

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

    nextDisabled: boolean = false;
    doneDisabled: boolean = false;

    constructor(
        private fb: FormBuilder,
        private _message: NzMessageService,
        private cdRef: ChangeDetectorRef
    ) {}


    ngOnInit() {
        this.form = this.fb.group({
            
        });
    }

    onKeynoteChange(e) {
        this.cmpSolution.cfg.keynote = e;
        // this.cdRef.markForCheck();
        // this.cdRef.detectChanges();

        if(this.cmpSolution.cfg.keynote.dimension
            && this.cmpSolution.cfg.keynote.direction
            && this.cmpSolution.cfg.keynote.participants.length) {
            this.nextDisabled = false;
        }
        else {
            // this.nextDisabled = true;
            this.nextDisabled = false;
        }
    }

    onCmpObjsChange(e) {
        this.cmpSolution.cfg.cmpObjs = e;
    }

    changeStep(newStep) {
        if(this.currentStep < newStep) {
            // this.nextDisabled = true;
            this.nextDisabled = false;
        }
        else if(this.currentStep > newStep) {
            this.nextDisabled = false;
        }
        this.currentStep = newStep;

        this.__tempKeynote = _.cloneDeep(this.cmpSolution.cfg.keynote);
    }

    done() {
        this._message.success('done');
    }
}
