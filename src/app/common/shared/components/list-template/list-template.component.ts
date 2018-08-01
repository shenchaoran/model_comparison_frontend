import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListFilterService } from './list-filter.service';

@Component({
    selector: 'ogms-list-template',
    templateUrl: './list-template.component.html',
    styleUrls: ['./list-template.component.scss']
})
export class ListTemplateComponent implements OnInit {

    _ownerFilterV;
    
    @Input() searchFilters: {
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
    @Input() list: any[];
    @Input() count: number;
    @Input() template: any;
    
    // @Input() type: string;

    @Input() withCreateBtn: boolean;
    @Input() starFilters: {
        label: string,
        value: string,
        checked: boolean
    }[];
    @Input() sortsFilters: {
        label: string,
        value: string,
        options: {
            label: string,
            value: string,
            checked: boolean
        }[]
    }[];

    @Output() onFiltersChange = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
        
    }

    changeFilters(v, type) {
        if(type === 'owner') {
            _.map(this.starFilters, opt => opt.checked = opt.value===v);
            this.searchFilters.owner = v;
        }
        else {
            let filter = _.find(this.sortsFilters, filter => filter.value === type);
            _.map(filter.options, opt => opt.checked = opt.value=== v);
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
