import { Component, OnInit } from '@angular/core';
import { CalculationService } from '../calculation.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'ogms-calcu-list',
    templateUrl: './calcu-list.component.html',
    styleUrls: ['./calcu-list.component.scss']
})
export class CalcuListComponent implements OnInit {
    
    _loading = true;

    calculations: any[];
    count;

    constructor(
        private service: CalculationService,
//private _notice: NzNotificationService
    ) { }

    ngOnInit() {
        this.search(undefined);
    }

    search(filters) {
        this.service.findAll(filters)
            .subscribe(response => {
                if(!response.error) {
                    this.calculations = response.data.docs;
                    this.count = response.data.count;
                    this._loading = false;
                }
                else {
                    this.calculations = [];
                }
            });
    }
}
