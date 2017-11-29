import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ogms-home',
  template: `
        <p>
            home works!
        </p>
        <router-outlet></router-outlet>
    `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
