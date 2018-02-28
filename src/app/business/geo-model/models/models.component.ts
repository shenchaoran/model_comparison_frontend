import { Component, OnInit } from '@angular/core';
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
  selector: 'ogms-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {

  constructor(
      private title: DynamicTitleService
  ) { }

  ngOnInit() {
  }

}
