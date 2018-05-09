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

    withCreateBtn: boolean = true;
    ownerFilter: {
        label: string,
        value: string,
        checked: boolean
    }[] = [
        {
            label: 'Created',
            value: 'Created',
            checked: false
        },
        {
            label: 'Followed',
            value: 'Followed',
            checked: false
        }
    ];
    otherFilters: {
        label: string,
        value: string,
        options: {
            label: string,
            value: string,
            checked: boolean
        }[]
    }[] = [
        {
            label: 'Organization',
            value: 'organization',
            options: [
                {
                    label: 'OGMS',
                    value: 'OGMS',
                    checked: false
                },
                {
                    label: 'SUMS',
                    value: 'SUMS',
                    checked: false
                }
            ]
        },
        {
            label: 'Sort',
            value: 'sort',
            options: [
                {
                    label: 'Most followed',
                    value: 'Most followed',
                    checked: false
                },
                {
                    label: 'Least followed',
                    value: 'Least followed',
                    checked: false
                },
                {
                    label: 'Newest',
                    value: 'Newest',
                    checked: false
                },
                {
                    label: 'Oldest',
                    value: 'Oldest',
                    checked: false
                }
            ]
        }
    ];

    constructor(
        private route: ActivatedRoute,
        private service: CmpIssueService,
        private _notice: NzNotificationService,
        // private loading: SlimLoadingBarService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.issues = resolveData.issues.docs;
            this.count = resolveData.issues.count;
        });
    }

    search(filters) {
        // this.loading.start();
        this.service.findAll(filters)
            .subscribe(response => {
                // this.loading.complete();
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
