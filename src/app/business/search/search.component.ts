import { Component, OnInit } from '@angular/core';
import { SearchService } from './services';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'ogms-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    options: {
        q: string,
        sort: string,
        type: string,
        filter: string
    } = {
        q: '',
        sort: '',
        type: '',
        filter: ''
    };

    categories: any[];
    list: any[];

    constructor(
        private service: SearchService,
        private _notice: NzNotificationService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.queryParams
            .subscribe((params: Params) => {
                this.options.q = params['q'];
                if(this.options.type === '') {
                    // 第一次默认搜索 Issues
                    this.options.type = 'Issues';
                }
                this.service.search(this.options)
                    .subscribe(response => {
                        if(response.error) {
                            this._notice.warning('Warning:', 'Get comparison task failed!');
                        }
                        else {
                            this.categories = response.data.categories;
                            this.list = response.data.list;
                        }
                    });
            });
    }

    onFiltersChange(options) {
        _.forIn(options, (v, k) => {
            if(k !== 'sort') {
                this.options[k] = v;
            }
        });
        this.service.search(this.options)
            .subscribe(response => {
                if(response.error) {
                    this._notice.warning('Warning:', 'Get comparison task failed!');
                }
                else {
                    this.categories = response.data.categories;
                    this.list = response.data.list;
                }
            });
    }
}
