import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MSService } from "../services/geo-models.service";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
    selector: 'ogms-geo-model-list',
    templateUrl: './geo-model-list.component.html',
    styleUrls: ['./geo-model-list.component.scss']
})
export class GeoModelListComponent implements OnInit {
    models: any[];
    count: number;
    
    withCreateBtn: boolean = true;
    ownerFilter: {
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
    otherFilters: {
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
        private route: ActivatedRoute,
        private service: MSService,
        private _notice: NzNotificationService,
        private title: DynamicTitleService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.models = resolveData.geoModelTree.docs;
            this.count = resolveData.geoModelTree.count;
        })
    }

    search(filters) {
        this.service.findAll(filters)
            .subscribe(response => {
                if (!response.error) {
                    this.models = response.data.docs;
                    this.count = response.data.count;
                }
            });
    }
}
