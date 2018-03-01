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
        value: string
    }[];
    organization: {
        label: string,
        value: string
    }[];
    radioFilters:{
        key: string,
        options: {
            label: string,
            value: string
        }[]
    };

    filters: {
        q: string,
        pageSize: number,
        pageNum: number,
        [key: string]: any
    } = {
        q: '',
        pageNum: 1,
        pageSize: 25
    };
    @Output() onFiltersChange = new EventEmitter<any>();

    @Input() list: any[];
    @Input() count: number;
    @Input() template: any;
    @Input() type: string;

    constructor(
        private filterService: ListFilterService
    ) { }

    ngOnInit() {
        this.filterService.init(this.type);
    }

    onRadioFiltersChange() {

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
