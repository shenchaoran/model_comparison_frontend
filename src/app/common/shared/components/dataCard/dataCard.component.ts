import { Component, OnInit, Input } from '@angular/core';

import { Data } from "../../../../business/mock/data.model";

@Component({
  selector: 'data-card',
  templateUrl: './dataCard.component.html',
  styleUrls: ['./dataCard.component.scss']
})
export class DataCardComponent implements OnInit {
  @Input() data: Data;

  constructor() { }

  ngOnInit() {
  }

}
