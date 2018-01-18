import { Component, OnInit, Input } from '@angular/core';

import { Model } from "../../mock/model.model";

@Component({
  selector: 'ogms-model-list-card',
  templateUrl: './model-list-card.component.html',
  styleUrls: ['./model-list-card.component.scss']
})
export class ModelListCardComponent implements OnInit {
  @Input() model: Model;

  constructor() { }

  ngOnInit() {
  }

}
