import { Component, OnInit, Input } from '@angular/core';

import { Model } from "../../../../business/mock/model.model";

@Component({
  selector: 'model-card',
  templateUrl: './modelCard.component.html',
  styleUrls: ['./modelCard.component.scss']
})
export class ModelCardComponent implements OnInit {
  @Input() model: Model;

  constructor() { }

  ngOnInit() {
  }

}
