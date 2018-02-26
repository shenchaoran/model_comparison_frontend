import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ogms-list-template',
    templateUrl: './list-template.component.html',
    styleUrls: ['./list-template.component.scss']
})
export class ListTemplateComponent implements OnInit {
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

    @Input() radioFilters:{
        key: string,
        options: {
            label: string,
            value: string
        }[]
    };
    @Input() list: any[];
    // list item template
    @Input() template: any;

    constructor() { }

    ngOnInit() {
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
