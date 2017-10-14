import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-siderTabs',
  templateUrl: './sider-tabs.component.html',
  styleUrls: ['./sider-tabs.component.scss']
})
export class SiderTabsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
      this.onResize();
  }

  onResize() {

  }

}
