import { Component, OnInit, Input } from '@angular/core';

import { Solution } from "../../../../business/mock/solution.model";

@Component({
  selector: 'solution-card',
  templateUrl: './solutionCard.component.html',
  styleUrls: ['./solutionCard.component.scss']
})
export class SolutionCardComponent implements OnInit {
  @Input() solution: Solution;

  constructor() { }

  ngOnInit() {
  }

}
