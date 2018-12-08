import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ListFilterService } from './list-filter.service';
import { OgmsBaseComponent } from '../../classes';
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import { ActivatedRoute } from "@angular/router";
import { get, map, find } from 'lodash';
import { Subject } from 'rxjs';

@Component({
    selector: 'ogms-list-template',
    templateUrl: './list-template.component.html',
    styleUrls: ['./list-template.component.scss']
})
export class ListTemplateComponent extends OgmsBaseComponent implements OnInit, OnDestroy {
    _loading = true;
    _ownerFilterV;
    _search$: Subject<any>;

    list: any[];
    count: number;

    @Input() public listAdaptor: Function = list => list;
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
        super();
        this._search$ = new Subject();
        this._subscriptions.push(this._search$.subscribe(searchFilters => {
            this._loading = true;
            this._subscriptions.push(this.service.findAll(searchFilters).subscribe(res => {
                this._loading = false;
                if (!res.error) {
                    this.list = this.listAdaptor(res.data.docs);
                    this.count = res.data.count;
                } else {

                }
            }));
        }));
    }

    onSearchClick() {
        this._search$.next(this.searchFilters);
    }

    ngOnInit() {
        let pageSize = get(this, 'searchFilters.pageSize') || 20;
        this._search$.next({ pageSize: pageSize });
    }

    onChangeFilters(v, type) {
        if (type === 'owner') {
            map(this.starFilters as any[], opt => opt.checked = opt.value === v);
            this.searchFilters.owner = v;
        }
        else {
            let filter = find(this.sortsFilters, filter => filter.value === type);
            map(filter.options as any[], opt => opt.checked = opt.value === v);
            this.searchFilters[filter.value] = v;
        }
        this._search$.next(this.searchFilters);
    }

    onPageChange(pageEvent) {
        this.searchFilters.pageIndex = pageEvent.pageIndex;
        this.searchFilters.pageSize = pageEvent.pageSize;
        this._search$.next(this.searchFilters);
    }
}
