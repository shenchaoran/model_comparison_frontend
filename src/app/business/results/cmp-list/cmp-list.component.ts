import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TaskService } from '../../services/task.service';
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
  selector: 'ogms-cmp-list',
  templateUrl: './cmp-list.component.html',
  styleUrls: ['./cmp-list.component.scss']
})
export class CmpListComponent {
    constructor(
        public route: ActivatedRoute,
        public service: TaskService,
        public title: DynamicTitleService
    ) { }
}