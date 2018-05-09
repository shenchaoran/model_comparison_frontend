import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListFilterService } from './list-filter.service';

@Component({
    selector: 'ogms-list-template',
    templateUrl: './list-template.component.html',
    styleUrls: ['./list-template.component.scss']
})
export class ListTemplateComponent implements OnInit {

    _ownerFilterV;
    
    filters: {
        q?: string,
        pageSize?: number,
        pageNum?: number,
        owner?: string,
        organization?: string,
        sort?: string,
        [key: string]: any
    } = {};
    @Output() onFiltersChange = new EventEmitter<any>();

    @Input() list: any[];
    @Input() count: number;
    @Input() template: any;
    
    @Input() type: string;

    @Input() withCreateBtn: boolean;
    @Input() ownerFilter: {
        label: string,
        value: string,
        checked: boolean
    }[];
    @Input() otherFilters: {
        label: string,
        value: string,
        options: {
            label: string,
            value: string,
            checked: boolean
        }[]
    }[];

    constructor() { }

    ngOnInit() {
        
    }

    changeFilters(v, type) {
        if(type === 'owner') {
            _.map(this.ownerFilter, opt => opt.checked = opt.value===v);
            this.filters.owner = v;
        }
        else {
            let filter = _.find(this.otherFilters, filter => filter.value === type);
            _.map(filter.options, opt => opt.checked = opt.value=== v);
            this.filters[filter.value] = v;
        }
        // console.log(this.filters);
        this.onSearch();
    }

    onSearch() {
        this.onFiltersChange.emit(this.filters);
    }

    setPageNum(pageNum) {
        this.filters.pageNum = pageNum;
        this.onSearch();
    }

    setPageSize(pageSize) {
        this.filters.pageSize = pageSize;
        this.onSearch();
    }

}
