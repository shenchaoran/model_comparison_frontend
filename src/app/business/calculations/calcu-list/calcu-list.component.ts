import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MSRService } from '@services/msr.service';
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
  selector: 'ogms-calcu-list',
  templateUrl: './calcu-list.component.html',
  styleUrls: ['./calcu-list.component.scss']
})
export class CalcuListComponent {
    constructor(
        public route: ActivatedRoute,
        public service: MSRService,
        public title: DynamicTitleService
    ) { }
}
