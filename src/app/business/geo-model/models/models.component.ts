import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MSService } from "../services";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
  selector: 'ogms-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  models: any[];
  count: number;

  constructor(
      private route: ActivatedRoute,
      private service: MSService,
//private _notice: NzNotificationService,
      private title: DynamicTitleService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(resolveData => {
      this.models = resolveData.geoModelTree.docs;
      this.count = resolveData.geoModelTree.count;
    })
  }

}
