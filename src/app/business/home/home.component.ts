import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
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
