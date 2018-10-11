import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ListFilterService } from '@common/shared/components/list-template/list-filter.service';
import { OgmsBaseComponent } from '@common/shared/components/ogms-base/ogms-base.component';
import { DynamicTitleService } from '@common/core/services/dynamic-title.service';
import { ActivatedRoute } from "@angular/router";

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
        pageNum?: number,
        owner?: string,
        organization?: string,
        sort?: string,
        [key: string]: any
    } = {
            pageSize: 15,
            pageNum: 1
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
        let pageSize = _.get(this, 'searchFilters.pageSize')
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
            _.map(this.starFilters, opt => opt.checked = opt.value === v);
            this.searchFilters.owner = v;
        }
        else {
            let filter = _.find(this.sortsFilters, filter => filter.value === type);
            _.map(filter.options, opt => opt.checked = opt.value === v);
            this.searchFilters[filter.value] = v;
        }
        this.search();
    }

    onPageChange(pageEvent) {
        this.searchFilters.pageNum = pageEvent.pageIndex;
        this.searchFilters.pageSize = pageEvent.pageSize;
        this.search();
    }
}
