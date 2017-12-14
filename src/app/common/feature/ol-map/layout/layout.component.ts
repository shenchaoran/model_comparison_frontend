// 组合了工具条、图例、数据源的布局
import { Component, OnInit, Inject } from '@angular/core';

import { MAP_TYPE } from '../model/map-component-type.enum';
import { MapConfigService } from '../services/map-config.service';

@Component({
    selector: 'ogms-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    mapType: MAP_TYPE = MAP_TYPE.SIMPLE;
    loadToolbar: boolean;
    loadLegend: boolean;
    loadSource: boolean;
    loadLayerstree: boolean;
    
    constructor(
        private mapCfgService: MapConfigService,
        @Inject('MAP_MODULES_CONFIG') private moduleCfg,
        @Inject('MAP_TOOLBAR_CONFIG') private toolbarCfg
    ) {
        this.mapCfgService.init(moduleCfg, toolbarCfg);
    }

    ngOnInit() {
        this.loadToolbar = this.mapCfgService.loadToolbar();
        this.loadLegend = this.mapCfgService.loadLegend();
        this.loadLayerstree = this.mapCfgService.loadSource();
        this.loadSource = this.mapCfgService.loadSource();
    }
}
