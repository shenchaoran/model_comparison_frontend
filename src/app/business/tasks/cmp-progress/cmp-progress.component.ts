import { Component, OnInit, Input, Output, EventEmitter, ElementRef, 
    AfterViewInit, OnDestroy, ViewChild, } from '@angular/core';
import { CmpState } from '@models';
import * as uuidv1 from 'uuid/v1'

@Component({
    selector: 'ogms-cmp-progress',
    templateUrl: './cmp-progress.component.html',
    styleUrls: ['./cmp-progress.component.scss']
})
export class CmpProgressComponent implements OnInit, AfterViewInit, OnDestroy {
    containerId
    @Input() data;
    @Output() onRestart = new EventEmitter<any>();
    @ViewChild('gridTable') gridTableRef: ElementRef;
    
    constructor() {
        this.containerId = uuidv1()
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    ngOnDestroy() {

    }

}
