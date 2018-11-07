import { Component, OnInit } from '@angular/core';
import { DatasetService } from '../../services';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';

@Component({
    selector: 'ogms-datasets',
    templateUrl: './datasets.component.html',
    styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit {
    stdList: any[];
    stdCount: number;
    selectedSTD: any;

    selectedEvent: any;

    constructor(
        private datasetService: DatasetService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.datasetService.findAll().subscribe(res => {
            if (!res.error) {
                this.stdList = res.data.docs;
                this.stdCount = res.data.count;

                if (this.stdCount > 0) {
                    this.selectedSTD = this.stdList[0];
                }
            }
        });
    }

    onEventSelected(event) {
        this.selectedEvent = cloneDeep(event);
    }

    onClassSelected(std) {
        this.selectedSTD = std;
        this.selectedEvent = undefined;
    }
}
