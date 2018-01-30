import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ogms-comparison',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
        height: 100%;
        overflow: scroll;
    }
  `]
})
export class ComparisonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
