import { Component, OnInit } from '@angular/core';

import { MockService } from "../../mock/mock.service";
import { Model } from "../../mock/model.model";

@Component({
  selector: 'ogms-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  models: Model[];

  constructor(private mockService: MockService) { 
    this.models = mockService.getModels();
  }

  ngOnInit() {
  }

}
