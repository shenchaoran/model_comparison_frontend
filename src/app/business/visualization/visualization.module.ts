import { NgModule } from '@angular/core';
import { HotTableModule } from 'angular-handsontable';
import { EchartsNg2Module } from 'echarts-ng2';

import { VisualizationComponent } from './visualization.component';
import { NgxSharedModule } from '../../common/ngx-shared/ngx-shared.module';
import { VisualizationRoutes } from './visualization-routing';
import { EchartAdapterService } from '../../common/core/services/echartAdapter.service';

@NgModule({
  imports: [
    NgxSharedModule,
    HotTableModule,
    VisualizationRoutes,
    EchartsNg2Module,
  ],
  declarations: [
      VisualizationComponent,
    ],
  providers: [
    EchartAdapterService
  ]
})
export class VisualizationModule { }