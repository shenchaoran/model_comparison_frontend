import { Component, OnInit } from '@angular/core';
import { CmpMethodService } from '../../services/cmp-method.service';

@Component({
    selector: 'ogms-method-list',
    templateUrl: './method-list.component.html',
    styleUrls: ['./method-list.component.scss']
})
export class MethodListComponent implements OnInit {

    constructor(
        public service: CmpMethodService
    ) { }

    ngOnInit() {
    }

}
