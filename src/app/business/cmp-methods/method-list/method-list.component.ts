import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmpMethodService } from '../../services/cmp-method.service';
import { CmpMethod } from '@models';

@Component({
    selector: 'ogms-method-list',
    templateUrl: './method-list.component.html',
    styleUrls: ['./method-list.component.scss']
})
export class MethodListComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
}
