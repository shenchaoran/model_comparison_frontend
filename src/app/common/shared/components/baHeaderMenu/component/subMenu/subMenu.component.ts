import { Component, OnInit, Input } from '@angular/core';

import { HeaderMenuMetaInfo } from '../../baHeaderMenu';

@Component({
  selector: 'app-subMenu',
  templateUrl: './subMenu.component.html',
  styleUrls: ['./subMenu.component.scss']
})
export class SubMenuComponent implements OnInit {
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

}
