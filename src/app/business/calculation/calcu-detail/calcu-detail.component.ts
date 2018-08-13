import { Component, OnInit } from '@angular/core';
import { CalculationService } from '../calculation.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ogms-calcu-detail',
    templateUrl: './calcu-detail.component.html',
    styleUrls: ['./calcu-detail.component.scss']
})
export class CalcuDetailComponent implements OnInit {
    
    _loading = true;

    calculation;

    constructor(
        private service: CalculationService,
//private _notice: NzNotificationService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            this.service.findOne(id)
                .subscribe(response => {
                    if(!response.error) {
                        this.calculation = response.data;
                    }
                    this._loading = false;
                })
        });
    }
}
