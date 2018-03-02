import { Component, OnInit, Input } from '@angular/core';

import { Solution } from '../../mock/solution.model';

@Component({
  selector: 'ogms-card-solution',
  templateUrl: './card-solution.component.html',
  styleUrls: ['./card-solution.component.scss']
})
export class CardSolutionComponent implements OnInit {
  @Input() solution: Solution;

  constructor() { }

  ngOnInit() {
  }

}
