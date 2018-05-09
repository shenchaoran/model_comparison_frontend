import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSharedModule } from '@ngx-shared';
import { EchartsNg2Module } from 'echarts-ng2';
import { HotTableModule } from 'angular-handsontable';
import { AsciiGridComponent } from './ascii-grid/ascii-grid.component';

import { OlMapService } from '@feature/ol-map/ol-map.module.ts';
import { TableComponent } from './table/table.component';
import { SwipeMapComponent } from './swipe-map/swipe-map.component';
import { GeojsonMapComponent } from './geojson-map/geojson-map.component';
import { DrawFeatureComponent } from './draw-feature/draw-feature.component';

const COMPONENTS = [
    AsciiGridComponent, 
    TableComponent, 
    SwipeMapComponent, 
    GeojsonMapComponent, 
    DrawFeatureComponent
]

@NgModule({
    imports: [
        NgxSharedModule,
        EchartsNg2Module,
        HotTableModule,
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
    providers: [
        OlMapService
    ]
})
export class VisualizationModule {}
