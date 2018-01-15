import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ogms-home',
  templateUrl: './home.component.html',
  styles: [`
      .ol-button i
      {	color: inherit;
      }
      .hello
      {	right: 50%;
          top: 0.5em;
      }
      .save
      {	left: 50%;
          top: 0.5em;
      }
      .text
      {	left: 50%;
          top: 2.5em;
      }
      `
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
    b = true;
    constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
  }
}
