import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import { CmpSlnService } from '../services';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'ogms-cmp-solution-list',
    templateUrl: './cmp-solution-list.component.html',
    styleUrls: ['./cmp-solution-list.component.scss']
})
export class CmpSolutionListComponent implements OnInit {
    solutions: any[];
    count: number;

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
