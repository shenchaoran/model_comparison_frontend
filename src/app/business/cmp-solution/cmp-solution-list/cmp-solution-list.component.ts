import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
        private service: CmpSlnService,
        private _notice: NzNotificationService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.solutions = resolveData.solutions.docs;
            this.count = resolveData.solutions.count;
        });
    }

    search(filters) {
        this.service.findAll(filters)
            .subscribe(response => {
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
