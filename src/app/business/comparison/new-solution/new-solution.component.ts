import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'ogms-new-solution',
    templateUrl: './new-solution.component.html',
    styleUrls: ['./new-solution.component.scss']
})
export class NewSolutionComponent implements OnInit {
    currentStep = 0;

    constructor(private _message: NzMessageService) {}

    ngOnInit() {}

    changeStep(currentStep) {
        this.currentStep = currentStep;
    }

    done() {
        this._message.success('done');
    }
}
