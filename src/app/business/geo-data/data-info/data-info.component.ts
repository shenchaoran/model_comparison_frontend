import { Component, OnInit } from '@angular/core';

import { MockService } from "../../mock/mock.service";
import { Model } from "../../mock/model.model";
import { Data } from "../../mock/data.model";
import { Solution } from "../../mock/solution.model";
import { Task } from "../../mock/task.model";

@Component({
  selector: 'ogms-data-info',
  templateUrl: './data-info.component.html',
  styleUrls: ['./data-info.component.scss']
})
export class DataInfoComponent implements OnInit {
  models: Model[];
  data: Data;
  datas: Data[];
  solutions: Solution[];
  tasks: Task[];

  constructor(private mockService: MockService) { 
    this.models = mockService.getModels();
    this.datas = mockService.getDatas();
    this.data = this.datas[0];
    this.solutions = mockService.getSolutions();
    this.tasks = mockService.getTask();
  }

  ngOnInit() {
  }

}
