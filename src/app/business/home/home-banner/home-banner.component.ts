import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ogms-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {
  constructor() { }
  array = ['Run all kinds of model online', 'Build your own global model config', 'Compare model result with others'];

  ngOnInit() {
    setTimeout(v => {
      //this.array = ['Run all kinds of model online', 'Build your own global model config', 'Compare model result with others'];
    }, 3000);
  }

}
