import { Component, OnInit, Input } from '@angular/core';

import { Data } from "../../mock/data.model";

@Component({
  selector: 'ogms-data-list-card',
  templateUrl: './data-list-card.component.html',
  styleUrls: ['./data-list-card.component.scss']
})
export class DataListCardComponent implements OnInit {
  @Input() data: Data;

  constructor() { }

  ngOnInit() {
  }

}
