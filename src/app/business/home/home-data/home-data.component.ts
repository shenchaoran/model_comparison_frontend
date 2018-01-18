import { Component, OnInit } from '@angular/core';

import * as _ from "lodash";

import { MockService } from "../../mock/mock.service";
import { Data } from "../../mock/data.model";

@Component({
  selector: 'ogms-home-data',
  templateUrl: './home-data.component.html',
  styleUrls: ['./home-data.component.scss']
})
export class HomeDataComponent implements OnInit {
  datas: Data[];

  constructor(private mockService: MockService) { 
    const allDatas = mockService.getDatas();
    const showDatas = _.take(allDatas, 8);
    this.datas = showDatas;
  }

  ngOnInit() {
  }

}
