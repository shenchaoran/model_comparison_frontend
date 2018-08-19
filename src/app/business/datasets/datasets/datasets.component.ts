import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ogms-datasets',
    templateUrl: './datasets.component.html',
    styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit {
    stdList: any[];
    stdCount: number;
    selectedSTD: any;

    _eventMenuVisiable: boolean;
    selectedEvent: any;

    constructor(
        private service: DataService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.service.findAll()
            .subscribe(response => {
                if (!response.error) {
                    this.stdList = response.data.docs;
                    this.stdCount = response.data.count;

                    if (this.stdCount > 0) {
                        this.selectedSTD = this.stdList[0];
                    }
                }
            });
    }

    onEventSelected(event) {
        this.selectedEvent = _.cloneDeep(event);
    }

    onClassSelected(std) {
        this.selectedSTD = std;
        this.selectedEvent = undefined;
        this._eventMenuVisiable = false;
    }
}
