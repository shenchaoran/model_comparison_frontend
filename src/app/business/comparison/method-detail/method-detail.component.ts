import { Component, OnInit } from '@angular/core';
import { CmpMethodService } from '../services/cmp-method.service';

@Component({
    selector: 'ogms-method-detail',
    templateUrl: './method-detail.component.html',
    styleUrls: ['./method-detail.component.scss']
})
export class MethodDetailComponent implements OnInit {

    constructor(
        public service: CmpMethodService
    ) { }

    ngOnInit() {
    }

}