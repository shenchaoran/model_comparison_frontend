import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ogms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    b = true;
    constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
  }
}
