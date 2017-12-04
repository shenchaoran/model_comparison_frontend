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

@NgModule({
    imports: [NgxSharedModule, SharedModule, OlMapRoutingModule],
    declarations: [
        OlMapComponent,
        LayerTreeComponent,
        ToolbarComponent,
        LegendComponent,
        LayoutComponent,
        BasemapComponent,
        CompareLayoutComponent
    ],
    providers: [
        ...services,
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
