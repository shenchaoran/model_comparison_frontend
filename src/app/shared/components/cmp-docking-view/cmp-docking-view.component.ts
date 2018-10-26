import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ogms-cmp-docking-view',
    templateUrl: './cmp-docking-view.component.html',
    styleUrls: ['./cmp-docking-view.component.scss']
})
export class CmpDockingViewComponent implements OnInit {

    @Input() template;
    @Input() template2;

    @Output() onChange = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

}
