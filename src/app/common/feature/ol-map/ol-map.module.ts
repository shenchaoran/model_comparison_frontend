import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { MAP_TOOLBAR_CONFIG } from '@config/map.config';

import { OlMapComponent } from '@common/feature/ol-map/ol-map.component';
import { LayerTreeComponent } from '@common/feature/ol-map/layer-tree/layer-tree.component';
import { LegendComponent } from '@common/feature/ol-map/legend/legend.component';
import { LayoutComponent } from '@common/feature/ol-map/layout/layout.component';
import { BasemapComponent } from '@common/feature/ol-map/basemap/basemap.component';

import {
    OlMapService,
    OLSymbolService,
    MapModuleService,
    ToolbarService
} from '@common/feature/ol-map/services';
import { CompareLayoutComponent } from '@common/feature/ol-map/compare-layout/compare-layout.component';
import { RegionMapComponent } from '@common/feature/ol-map/region-map/region-map.component';

const SERVICES = [
    OlMapService,
    OLSymbolService,
    MapModuleService,
    ToolbarService
];

///////////////////////////////
export { OlMapComponent } from '@common/feature/ol-map/ol-map.component';
export { BasemapComponent } from '@common/feature/ol-map/basemap/basemap.component';
export {
    CompareLayoutComponent
} from '@common/feature/ol-map/compare-layout/compare-layout.component';
export { LayerTreeComponent } from '@common/feature/ol-map/layer-tree/layer-tree.component';
export { LayoutComponent } from '@common/feature/ol-map/layout/layout.component';
export { LegendComponent } from '@common/feature/ol-map/legend/legend.component';

export { MapModuleService } from '@common/feature/ol-map/services';
export {
    MapService,
    OlMapService,
    OLSymbolService,
    ToolbarService,
    RegionMapService,
    GeoJSONService,
} from '@common/feature/ol-map/services';
///////////////////////////////

@NgModule({
    imports: [SharedModule],
    declarations: [
        LayoutComponent,
        OlMapComponent,
        LayerTreeComponent,
        LegendComponent,
        BasemapComponent,
        CompareLayoutComponent,
        RegionMapComponent
    ],
    exports: [
        LayoutComponent,
        OlMapComponent,
        LayerTreeComponent,
        LegendComponent,
        BasemapComponent,
        CompareLayoutComponent,
        RegionMapComponent
    ],
    providers: [
        ...SERVICES,
        // 这两个依赖在该模块的父模块中提供，能够实现不同的注入动态加载不同的地图配置
        // {
        //     provide: 'MAP_MODULES_CONFIG',
        //     useValue: MAP_MODULES_CONFIG
        // },
        {
            provide: 'MAP_TOOLBAR_CONFIG',
            useValue: MAP_TOOLBAR_CONFIG
        }
    ]
})
export class OlMapModule {}
