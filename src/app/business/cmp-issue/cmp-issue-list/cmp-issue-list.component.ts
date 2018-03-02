import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmpIssueService } from '../services';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
    selector: 'ogms-cmp-issue-list',
    templateUrl: './cmp-issue-list.component.html',
    styleUrls: ['./cmp-issue-list.component.scss']
})
export class CmpIssueListComponent implements OnInit {
    issues: any[];
    count: number;
    constructor(
        private route: ActivatedRoute,
        private service: CmpIssueService,
        private _notice: NzNotificationService,
        private loading: SlimLoadingBarService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.issues = resolveData.issues.docs;
            this.count = resolveData.issues.count;
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
                    this.issues = response.data.docs;
                    this.count = response.data.count;
                }
            });
    }
}
