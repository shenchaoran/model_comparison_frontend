import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSharedModule } from '@ngx-shared/ngx-shared.module';
import { SharedModule } from '@shared/shared.module';

import { GeoDataRoutingModule } from './geo-data-routing.module';
import { GeoDataComponent } from './geo-data.component';
import { StdDataSetComponent } from './std-data-set/std-data-set.component';
import { DataProcessorComponent } from './data-processor/data-processor.component';

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,

    GeoDataRoutingModule,
  ],
  declarations: [GeoDataComponent, StdDataSetComponent, DataProcessorComponent]
})
export class GeoDataModule { }
