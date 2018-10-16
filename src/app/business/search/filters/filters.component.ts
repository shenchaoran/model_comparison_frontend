import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SearchService } from '@services';

@Component({
    selector: 'ogms-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
    options: {
        [key: string]: string
    } = {};
    @Output() onFiltersChange = new EventEmitter<any>();
    @Input() categories: {
        name: string,
        num: string,
        children?: any
    }[];
    selected: any;

    constructor() { }

    ngOnInit() {
    }

    changeFilter(key, v) {
        if(key === 'type') {
            this.options = {};
            this.selected = v;
            this.options[key] = v.name;
        }
        else {
            if(this.options[key] === v.name) {
                this.options[key] = '';
            }
            else {
                this.options[key] = v.name;
            }
        }
        
        this.onFiltersChange.emit(this.options);
    }

}
