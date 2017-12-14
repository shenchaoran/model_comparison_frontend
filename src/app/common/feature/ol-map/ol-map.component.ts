import { Component, OnInit } from '@angular/core';
import {
    OlMapService
} from './services';

@Component({
  selector: 'ogms-ol-map',
  template: `
    <ogms-layout></ogms-layout>
  `,
  styles: [],
  providers: [
      OlMapService,
    ]
})
export class OlMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
