import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmpSlnService } from '../services';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
    selector: 'ogms-cmp-solution-list',
    templateUrl: './cmp-solution-list.component.html',
    styleUrls: ['./cmp-solution-list.component.scss']
})
export class CmpSolutionListComponent implements OnInit {
    count: number;
    solutions: any[]

    constructor(
        private route: ActivatedRoute,
        private service: CmpSlnService,
        private _notice: NzNotificationService,
        private title: DynamicTitleService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.solutions = resolveData.solutions.docs;
            this.count = resolveData.solutions.count;
        });
    }

    search(filters) {
        
    }
}
