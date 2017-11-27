// TODO divider
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import { HeaderMenuMetaInfo } from '../../baHeaderMenu';

@Component({
  selector: 'app-subMenu',
  templateUrl: './subMenu.component.html',
  styleUrls: ['./subMenu.component.scss']
})
export class SubMenuComponent implements OnInit, AfterViewInit {
    _subMenu: HeaderMenuMetaInfo;
    @Input() 
    set subMenu(v){
        this._subMenu = v;
        // console.log(v.path);
    }
    get subMenu(){
        return this._subMenu;
    }
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //   jQuery('.disabled-menu-item:hover').css('color', '#eeeeee');
  }
}
