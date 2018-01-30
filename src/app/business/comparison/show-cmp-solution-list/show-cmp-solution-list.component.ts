import { Component, OnInit } from '@angular/core';

import { MockService } from "../../mock/mock.service";
import { Solution } from "../../mock/solution.model";

@Component({
  selector: 'ogms-show-cmp-solution-list',
  templateUrl: './show-cmp-solution-list.component.html',
  styleUrls: ['./show-cmp-solution-list.component.scss']
})
export class ShowCmpSolutionListComponent implements OnInit {
  solutions: Solution[];

  constructor(private mockService: MockService) { 
    this.solutions = mockService.getSolutions();
    console.log(this.solutions);
  }

  ngOnInit() {
  }

}
