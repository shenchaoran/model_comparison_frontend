import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Model } from "../../mock/model.model";

@Component({
  selector: 'ogms-model-list-card',
  templateUrl: './model-list-card.component.html',
  styleUrls: ['./model-list-card.component.scss']
})
export class ModelListCardComponent implements OnInit {
  @Input() model: Model;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  goToDetail() {
    this.router.navigate([`${this.model.modelId}`], {
      relativeTo: this.route
    })
  }

}
