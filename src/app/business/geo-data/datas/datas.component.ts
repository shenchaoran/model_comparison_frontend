import { Component, OnInit } from '@angular/core';
import { DynamicTitleService } from '@core/services/dynamic-title.service';

@Component({
  selector: 'ogms-datas',
  templateUrl: './datas.component.html',
  styleUrls: ['./datas.component.scss']
})
export class DatasComponent implements OnInit {

  constructor(
      private title: DynamicTitleService
  ) { }

  ngOnInit() {
  }

}
