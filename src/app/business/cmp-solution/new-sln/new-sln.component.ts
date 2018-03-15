import { Component, OnInit } from '@angular/core';
import { CmpSolution } from '@models';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { MSService } from '../../geo-model/services/model.service';

@Component({
    selector: 'ogms-new-sln',
    templateUrl: './new-sln.component.html',
    styleUrls: ['./new-sln.component.scss']
})
export class NewSlnComponent implements OnInit {
    cmpSln: FormGroup;

    sln;
    mss = [];
    msCount;
    msPageNum = 1;

    currentStep = 0;
    doneDisabled = false;
    nextDisabled = false;

    selectedComputeLayout = 'Tab';
    computeLayout = [
        {
            label: 'Collapse',
            value: 'Collapse',
            checked: true
        },
        {
            label: 'Tab',
            value: 'Tab',
            checked: false
        }
    ];

    constructor(
        private msService: MSService,
        private fb: FormBuilder
    ) {
        this.sln = new CmpSolution();
    }

    ngOnInit() {
        this.cmpSln = this.fb.group({
            
        });

        this.msService.findAll({})
            .subscribe(response => {
                if (response.error) {

                }
                else {
                    this.mss = response.data.docs;
                    this.msCount = response.data.count;
                }
            });
    }

    changeStep(v) {
        this.currentStep = v;
    }

    done() {

    }

    onComputeLayoutChange(item) {
        _.map(this.computeLayout, item => item.checked = false);
        item.checked = true;
        this.selectedComputeLayout = item.value;
    }
}
