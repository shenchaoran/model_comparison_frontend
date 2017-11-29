import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'njgis-testRecur',
  templateUrl: './testRecur.component.html',
  styleUrls: ['./testRecur.component.scss']
})
export class TestRecurComponent implements OnInit {
    @Input() i;
  constructor() { }

  ngOnInit() {
  }

}
