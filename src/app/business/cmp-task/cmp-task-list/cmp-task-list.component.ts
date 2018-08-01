import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { CmpTaskService } from '../services';

@Component({
    selector: 'ogms-cmp-task-list',
    templateUrl: './cmp-task-list.component.html',
    styleUrls: ['./cmp-task-list.component.scss']
})
export class CmpTaskListComponent implements OnInit, AfterViewInit {
    tasks: any[];
    count: number;
    buttons : any[];
    
    withCreateBtn: boolean = true;
    starFilters: {
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
    sortsFilters: {
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
        private service: CmpTaskService,
//private _notice: NzNotificationService,
    ) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.tasks = resolveData.tasks.docs;
            this.count = resolveData.tasks.count;
        });
    }

    ngAfterViewInit() {
    }

    search(filters) {
        this.service.findAll(filters)
            .subscribe(response => {
                if(response.error) {
                    // this._notice.warning('Warning:', 'Get issues failed!');
                }
                else {
                    this.tasks = response.data.docs;
                    this.count = response.data.count;
                }
            });
    }
}
