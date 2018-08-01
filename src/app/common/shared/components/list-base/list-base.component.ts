import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListBaseService } from '../../services/list-base.service';
import { ActivatedRoute } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import { OgmsBaseComponent } from '../ogms-base/ogms-base.component';
/**
 * list 类型的组件基类，极大地复用了组件模板代码
 * 组件继承只能继承类，不能继承模板，不同list 模板的区别在于 list item template
 * 
 * @export
 * @class ListBaseComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'ogms-list-base',
    templateUrl: './list-base.component.html',
    styleUrls: ['./list-base.component.scss']
})

export class ListBaseComponent extends OgmsBaseComponent implements OnInit, OnDestroy {
    public _loading = true;
    public count;
    public list;
    public withCreateBtn = false;
    public starFilters: {
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
    public sortsFilters: {
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
        public service: ListBaseService,
        //private _notice: NzNotificationService,
        public title: DynamicTitleService
    ) {
        super();
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

    search(filters) {
        this._loading = true
        this._subscriptions.push(this.service.findAll(filters)
            .subscribe(response => {
                this._loading = false
                if (!response.error) {
                    this.list = response.data.docs;
                    this.count = response.data.count;
                }
            }));
    }
}
