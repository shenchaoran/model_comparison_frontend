import { Component, OnInit } from '@angular/core';

import { MockService } from "../../mock/mock.service";
import { Model } from "../../mock/model.model";
import { Data } from "../../mock/data.model";
import { Solution } from "../../mock/solution.model";
import { Task } from "../../mock/task.model";

@Component({
  selector: 'ogms-model-info',
  templateUrl: './model-info.component.html',
  styleUrls: ['./model-info.component.scss']
})
export class ModelInfoComponent implements OnInit {
  model: Model;
  models: Model[];
  datas: Data[];
  solutions: Solution[];
  tasks: Task[];

  constructor(private mockService: MockService) { 
    this.models = mockService.getModels();
    this.model = this.models[0];
    this.datas = mockService.getDatas();
    this.solutions = mockService.getSolutions();
    console.log(this.solutions);
    this.tasks = mockService.getTask();
  }

  ngOnInit() {
  }

}
