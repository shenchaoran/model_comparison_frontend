import { Component, OnInit } from '@angular/core';

import { MockService } from "../../mock/mock.service";
import { Model } from "../../mock/model.model";
import { Data } from "../../mock/data.model";
import { Solution } from "../../mock/solution.model";
import { Task } from "../../mock/task.model";

@Component({
  selector: 'ogms-show-cmp-solutioninfo',
  templateUrl: './show-cmp-solutioninfo.component.html',
  styleUrls: ['./show-cmp-solutioninfo.component.scss']
})
export class ShowCmpSolutioninfoComponent implements OnInit {
  models: Model[];
  datas: Data[];
  solutions: Solution[];
  tasks: Task[];
  solution: Solution;

  constructor(private mockService: MockService) { 
    this.models = mockService.getModels();
    this.datas = mockService.getDatas();
    this.solutions = mockService.getSolutions();
    this.tasks = mockService.getTask();

    this.solution = this.solutions[0];
  }

  ngOnInit() {
  }

}
