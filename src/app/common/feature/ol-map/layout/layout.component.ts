// 组合了工具条、图例、数据源的布局
import { Component, OnInit, Inject, Input } from '@angular/core';

import { MAP_TYPE } from '@common/feature/ol-map/models';

@Component({
    selector: 'ogms-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    mapType: MAP_TYPE = MAP_TYPE.SIMPLE;
    @Input() targetId: string;
    // loadToolbar: boolean;
    // loadLegend: boolean;
    // loadSource: boolean;
    // loadLayerstree: boolean;
    
    constructor(
        @Inject('MAP_TOOLBAR_CONFIG') private toolbarCfg
    ) {
        // this.mapCfgService.init(toolbarCfg);
    }

    ngOnInit() {
        // this.loadToolbar = this.mapCfgService.loadToolbar();
        // this.loadLegend = this.mapCfgService.loadLegend();
        // this.loadLayerstree = this.mapCfgService.loadSource();
        // this.loadSource = this.mapCfgService.loadSource();
    }
}
