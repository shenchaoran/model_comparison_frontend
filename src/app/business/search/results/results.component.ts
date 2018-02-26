import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
    selector: 'ogms-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

    @Input() list: any[];
    
    constructor() { }

    ngOnInit() {
    }

}
