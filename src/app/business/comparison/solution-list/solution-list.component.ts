import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SolutionService } from '../../services/sln.service';
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import { Solution } from '@models';

@Component({
    selector: 'ogms-solution-list',
    templateUrl: './solution-list.component.html',
    styleUrls: ['./solution-list.component.scss']
})
export class SolutionListComponent implements OnInit {
    constructor(
        public solutionService: SolutionService,
        public route: ActivatedRoute,
        public title: DynamicTitleService
    ) {}

    ngOnInit() {}
}
