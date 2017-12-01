// 组合了工具条、图例、数据源的布局
import { Component, OnInit } from '@angular/core';

import { MAP_TYPE } from '../model/map-component-type.enum';

@Component({
    selector: 'ogms-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    mapType: MAP_TYPE = MAP_TYPE.SIMPLE;
    
    constructor() {}

    ngOnInit() {}
}
