import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ogms-life-loop',
  templateUrl: './life-loop.component.html',
  styleUrls: ['./life-loop.component.scss']
})
export class LifeLoopComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
      console.log(jQuery('#abcd').length);
  }


}
