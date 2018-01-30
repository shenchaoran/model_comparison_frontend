import { Component, OnInit } from '@angular/core';

import { MockService } from "../../mock/mock.service";
import { Data } from "../../mock/data.model";

@Component({
  selector: 'ogms-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  datas: Data[];

  constructor(private mockService: MockService) { 
    this.datas = mockService.getDatas();
  }

  ngOnInit() {
  }

}
