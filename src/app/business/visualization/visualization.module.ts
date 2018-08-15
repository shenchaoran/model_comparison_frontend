import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSharedModule } from '@common/ngx-shared';
import { EchartsNg2Module } from 'echarts-ng2';
import { HotTableModule } from 'angular-handsontable';
import { AsciiGridComponent } from './ascii-grid/ascii-grid.component';

import { OlMapService } from '@common/feature/ol-map/ol-map.module';
import { TableComponent } from './table/table.component';
import { SwipeMapComponent } from './swipe-map/swipe-map.component';
import { GeojsonMapComponent } from './geojson-map/geojson-map.component';
import { DrawFeatureComponent } from './draw-feature/draw-feature.component';
import { HandsomeTableComponent } from './handsome-table/handsome-table.component';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

const COMPONENTS = [
    AsciiGridComponent, 
    TableComponent, 
    SwipeMapComponent, 
    GeojsonMapComponent, 
    DrawFeatureComponent,
    HandsomeTableComponent,
]

@NgModule({
    imports: [
        NgxSharedModule,
        EchartsNg2Module,
        HotTableModule,
    ],
    declarations: [
        ...COMPONENTS,
    ],
    exports: [
        ...COMPONENTS
    ],
    providers: [
        OlMapService,
        NzNotificationService
    ]
})
export class VisualizationModule {}
