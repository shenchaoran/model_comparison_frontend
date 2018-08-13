import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListFilterService } from './list-filter.service';

@Component({
    selector: 'ogms-list-template',
    templateUrl: './list-template.component.html',
    styleUrls: ['./list-template.component.scss']
})
export class ListTemplateComponent implements OnInit {
    public _loading = true;
    _ownerFilterV;

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
    @Input() public list: any[];
    @Input() public count: number;
    @Input() public template: any;
    @Input() public withCreateBtn: boolean;
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

    @Output() public onFiltersChange = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {

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
        this.onSearch();
    }

    onSearch() {
        this.onFiltersChange.emit(this.searchFilters);
    }

    setPageNum(pageNum) {
        this.searchFilters.pageNum = pageNum;
        this.onSearch();
    }

    setPageSize(pageSize) {
        this.searchFilters.pageSize = pageSize;
        this.onSearch();
    }

}
