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

@NgModule({
    imports: [
        NgxSharedModule,
        EchartsNg2Module,
        HotTableModule,
    ],
    declarations: [
        AsciiGridComponent, 
        TableComponent, 
        SwipeMapComponent, GeojsonMapComponent
    ],
    exports: [
        AsciiGridComponent,
        TableComponent,
        EchartsNg2Module,
        SwipeMapComponent,
    ],
    providers: [OlMapService]
})
export class VisualizationModule {}
