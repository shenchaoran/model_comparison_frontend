import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared';
import { SharedModule } from '@shared';
import { MAP_MODULES_CONFIG, MAP_TOOLBAR_CONFIG } from '@config/map.config';

import { OlMapRoutingModule } from './ol-map-routing.module';
import { OlMapComponent } from './ol-map.component';
import { LayerTreeComponent } from './layer-tree/layer-tree.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LegendComponent } from './legend/legend.component';
import { LayoutComponent } from './layout/layout.component';
import { BasemapComponent } from './basemap/basemap.component';

import {
    OlMapService,
    OLSymbolService,
    MapConfigService,
    ToolbarService,
} from './services';
import { CompareLayoutComponent } from './compare-layout/compare-layout.component';

const services = [
    OlMapService,
    OLSymbolService,
    MapConfigService,
    ToolbarService,
]

///////////////////////////////
export { OlMapComponent } from './ol-map.component';
export { LayoutComponent } from './layout/layout.component';
///////////////////////////////

@NgModule({
    imports: [NgxSharedModule, SharedModule, OlMapRoutingModule],
    declarations: [
        LayoutComponent,
        OlMapComponent,
        LayerTreeComponent,
        ToolbarComponent,
        LegendComponent,
        BasemapComponent,
        CompareLayoutComponent
    ],
    exports: [OlMapComponent],
    providers: [
        ...services,
        // 这两个依赖在该模块的父模块中提供，能够实现不同的注入动态加载不同的地图配置
        {
            provide: 'MAP_MODULES_CONFIG',
            useValue: MAP_MODULES_CONFIG
        },
        {
            provide: 'MAP_TOOLBAR_CONFIG',
            useValue: MAP_TOOLBAR_CONFIG
        }
    ]
})
export class OlMapModule {}
