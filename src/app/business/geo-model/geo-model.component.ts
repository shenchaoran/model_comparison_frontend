import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'njgis-geo-model',
  template: `
    <p>
      geo-model Works!
    </p>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class GeoModelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
