import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ogms-calcu-result',
    templateUrl: './calcu-result.component.html',
    styleUrls: ['./calcu-result.component.scss']
})
export class CalcuResultComponent implements OnInit {
    @Input() msInstance;
    

    constructor() { }

    ngOnInit() {
    }

}
