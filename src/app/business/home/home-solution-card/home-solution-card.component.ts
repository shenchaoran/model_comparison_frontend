import { Component, OnInit, Input } from '@angular/core';

import { Solution } from "../../mock/solution.model";

@Component({
  selector: 'ogms-home-solution-card',
  templateUrl: './home-solution-card.component.html',
  styleUrls: ['./home-solution-card.component.scss']
})
export class HomeSolutionCardComponent implements OnInit {
  @Input() solution: Solution;

  constructor() { }

  ngOnInit() {
  }

}
