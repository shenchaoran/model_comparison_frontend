import { Component, OnInit, Input } from '@angular/core';

import { Data } from "../../mock/data.model";

@Component({
  selector: 'ogms-home-data-card',
  templateUrl: './home-data-card.component.html',
  styleUrls: ['./home-data-card.component.scss']
})
export class HomeDataCardComponent implements OnInit {
  @Input() data: Data;

  constructor() { }

  ngOnInit() {
  }

}
