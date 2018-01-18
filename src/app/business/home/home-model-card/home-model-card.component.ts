import { Component, OnInit, Input } from '@angular/core';

import { Model } from "../../mock/model.model";

@Component({
  selector: 'ogms-home-model-card',
  templateUrl: './home-model-card.component.html',
  styleUrls: ['./home-model-card.component.scss']
})
export class HomeModelCardComponent implements OnInit {
  @Input() model: Model;

  constructor() { }

  ngOnInit() {
  }

}
