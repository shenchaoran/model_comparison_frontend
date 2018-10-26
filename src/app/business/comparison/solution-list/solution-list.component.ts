import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SolutionService } from '../../services/sln.service';
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
    selector: 'ogms-solution-list',
    templateUrl: './solution-list.component.html',
    styleUrls: ['./solution-list.component.scss']
})
export class SolutionListComponent implements OnInit {
    createBtn = {
        display: true,
        url: '/comparison/solutions/create'
    }

    constructor(
        public service: SolutionService,
        public route: ActivatedRoute,
        public title: DynamicTitleService
    ) {}

    ngOnInit() {

    }
}
