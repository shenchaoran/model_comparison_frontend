import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ListFilterService } from '@shared/components/list-template/list-filter.service';
import { OgmsBaseComponent } from '@shared/components/ogms-base/ogms-base.component';
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import { ActivatedRoute } from "@angular/router";
import { get, map, find } from 'lodash';

@Component({
    selector: 'ogms-list-template',
    templateUrl: './list-template.component.html',
    styleUrls: ['./list-template.component.scss']
})
export class ListTemplateComponent extends OgmsBaseComponent implements OnInit, OnDestroy {
    _loading = true;
    list: any[];
    count: number;
    _ownerFilterV;

    @Input() public createBtn: {
        display: boolean,
        url: string
    };
    @Input() public service: any;
    @Input() public searchFilters: {
        q?: string,
        pageSize?: number,
        pageIndex?: number,
        owner?: string,
        organization?: string,
        sort?: string,
        [key: string]: any
    } = {
            pageSize: 15,
            pageIndex: 1
        };
    @Input() public template: any;
    @Input() public starFilters: {
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
    @Input() public sortsFilters: {
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
        public route: ActivatedRoute,
        public title: DynamicTitleService
    ) { 
        super()
    }

    ngOnInit() {
        let pageSize = get(this, 'searchFilters.pageSize')
        this._subscriptions.push(this.service.findAll(pageSize? {
            pageSize: pageSize
        }: {})
            .subscribe(response => {
                this._loading = false
                if (response.error) {
                    return Promise.reject(response.error);
                } else {
                    this.list = response.data.docs;
                    this.count = response.data.count;
                }
            }));
    }

    search() {
        this._loading = true
        this._subscriptions.push(this.service.findAll(this.searchFilters)
            .subscribe(response => {
                this._loading = false
                if (!response.error) {
                    this.list = response.data.docs;
                    this.count = response.data.count;
                }
            }));
    }

    changeFilters(v, type) {
        if (type === 'owner') {
            map(this.starFilters as any[], opt => opt.checked = opt.value === v);
            this.searchFilters.owner = v;
        }
        else {
            let filter = find(this.sortsFilters, filter => filter.value === type);
            map(filter.options as any[], opt => opt.checked = opt.value === v);
            this.searchFilters[filter.value] = v;
        }
        this.search();
    }

    onPageChange(pageEvent) {
        this.searchFilters.pageIndex = pageEvent.pageIndex;
        this.searchFilters.pageSize = pageEvent.pageSize;
        this.search();
    }
}
