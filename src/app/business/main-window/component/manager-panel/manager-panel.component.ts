import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-managerPanel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.scss']
})
export class ManagerPanelComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
      this.onResize();
  }

  onResize() {
    // 设置tab-content的高度100%
    // jQuery('#manager-tab').css('height', '100%');
    jQuery('#manager-tab .ant-tabs').css({
        'display': 'flex',
        'flex-flow': 'column nowrap'
    });
    jQuery('#manager-tab .ant-tabs-content').css({
        'flex': '1',
        'overflow': 'scroll'
    });
    jQuery('#manager-tab nz-tab-body').css('height', '100%');
    // jQuery('#manager-tab nz-tab-body').css('overflow', 'hidden');
    // jQuery('#manager-tab .ant-tabs-tabpane-active').css('height', '100%');
  }

}
