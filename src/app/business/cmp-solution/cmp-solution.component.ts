import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ogms-cmp-solution',
  template: `
    <div class='section-container'>
        <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class CmpSolutionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
