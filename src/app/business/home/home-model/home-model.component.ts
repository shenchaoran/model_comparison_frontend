import { Component, OnInit } from '@angular/core';

import * as _ from "lodash";

import { MockService } from "../../mock/mock.service";
import { Model } from "../../mock/model.model";

@Component({
  selector: 'ogms-home-model',
  templateUrl: './home-model.component.html',
  styleUrls: ['./home-model.component.scss']
})
export class HomeModelComponent implements OnInit {
  models: Model[];

  constructor(private mockService: MockService) { 
    const allModels = mockService.getModels();
    const showModels = _.take(allModels, 8);
    this.models = showModels;
    // console.log(this.models);
  }

  ngOnInit() {
  }

}
