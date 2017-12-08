import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { DataService } from '../services/data.service';
import { LoginService } from '@feature/login/login.service';

@Component({
    selector: 'ogms-data-tabs',
    templateUrl: './data-tabs.component.html',
    styleUrls: ['./data-tabs.component.scss']
})
export class DataTabsComponent implements OnInit {
    tabs: Array<any>;

    constructor(
        private service: DataService,
        private loginService: LoginService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        if(this.loginService.hasLogin) {
            this.tabs = [
                {
                    name: 'Std Testify Set',
                    id: 'std',
                    data: undefined
                },
                {
                    name: 'Your Data Set',
                    id: 'personal',
                    data: undefined
                },
                {
                    name: 'Public Data Set',
                    id: 'public',
                    data: undefined
                }
            ];
        }
        else {
            this.tabs = [
                {
                    name: 'Std Testify Set',
                    id: 'std',
                    data: undefined
                },
                {
                    name: 'Public Data Set',
                    id: 'public',
                    data: undefined
                }
            ]
        }

        this.route.data.subscribe(resolveData => {
            const geoData = resolveData.geoData;
            _.forIn(geoData, (value, key) => {
                _.map(this.tabs, tab => {
                    if(tab.id === key) {
                        tab.data = value;
                    }
                });
            });
        })
    }
}
