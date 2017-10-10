import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-testRecur',
  templateUrl: './testRecur.component.html',
  styleUrls: ['./testRecur.component.scss']
})
export class TestRecurComponent implements OnInit {
    @Input() i;
  constructor() { }

  ngOnInit() {
  }

}
