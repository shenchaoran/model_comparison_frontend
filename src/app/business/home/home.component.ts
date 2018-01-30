import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ogms-home',
  template: `
        <p>
            home works!
        </p>
        <router-outlet></router-outlet>
    `,
  styles: [`
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
