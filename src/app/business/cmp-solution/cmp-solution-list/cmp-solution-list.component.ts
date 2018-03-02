import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmpSlnService } from '../services';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

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
        private loading: SlimLoadingBarService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.solutions = resolveData.solutions.docs;
            this.count = resolveData.solutions.count;
        });
    }

    search(filters) {
        this.loading.start();
        this.service.findAll(filters)
            .subscribe(response => {
                this.loading.complete();
                if(response.error) {
                    this._notice.warning('Warning:', 'Get issues failed!');
                }
                else {
                    this.solutions = response.data.docs;
                    this.count = response.data.count;
                }
            });
    }
}
