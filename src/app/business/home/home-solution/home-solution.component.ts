import { Component, OnInit } from '@angular/core';

import * as _ from "lodash";

import { MockService } from "../mock/mock.service";
import { Solution } from "../mock/solution.model";

@Component({
  selector: 'ogms-home-solution',
  templateUrl: './home-solution.component.html',
  styleUrls: ['./home-solution.component.scss']
})
export class HomeSolutionComponent implements OnInit {
  solutions: Solution[];

  constructor(private mockService: MockService) { 
    const allSolutions = mockService.getSolutions();
    const showSolutions = _.take(allSolutions, 8);
    this.solutions = showSolutions;
  }

  ngOnInit() {
  }

}
