import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListFilterService } from './list-filter.service';

@Component({
    selector: 'ogms-list-template',
    templateUrl: './list-template.component.html',
    styleUrls: ['./list-template.component.scss']
})
export class ListTemplateComponent implements OnInit {

    sort: {
        label: string,
        value: string,
        checked: boolean
    }[];
    organization: {
        label: string,
        value: string,
        checked: boolean
    }[];
    owner: {
        label: string,
        value: string,
        checked: boolean
    }[];

    filters: {
        q?: string,
        pageSize?: number,
        pageNum?: number,
        [key: string]: any,
        owner?: string,
        organization?: string,
        sort?: string
    } = {};
    @Output() onFiltersChange = new EventEmitter<any>();

    @Input() list: any[];
    @Input() count: number;
    @Input() template: any;
    @Input() type: string;
    @Input() buttons: any[];
    @Input() hasCreate: boolean;

    constructor(
        private filterService: ListFilterService,
    ) { }

    ngOnInit() {
        this.filterService.init(this.type);
        this.owner = this.filterService.getOwnerFilter();
        this.organization = this.filterService.getOrganizationFilter();
        this.sort = this.filterService.getSortFilter();
        if(this.owner && this.owner.length) {
            this.filters.owner = this.owner[0].value;
        }
    }

    changeFilters(v, type) {
        _.map(this[type], item => {
            if(item.value === v) {
                item.checked = true;
            }
            else {
                item.checked = false;
            }
        });
        this.filters[type] = v;
        this.onSearch();
    }

    onSearch() {
        this.onFiltersChange.emit(this.filters);
    }

    setPageNum(pageNum) {
        this.filters.pageNum = pageNum;
        this.onFiltersChange.emit(this.filters);
    }

    setPageSize(pageSize) {
        this.filters.pageSize = pageSize;
        this.onFiltersChange.emit(this.filters);
    }

}
