import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSharedModule } from '@ngx-shared/ngx-shared.module';
import { SharedModule } from '@shared/shared.module';

import { GeoModelRoutingModule } from './geo-model-routing.module'
import { GeoModelComponent } from './geo-model.component';

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,

    GeoModelRoutingModule,
  ],
  declarations: [GeoModelComponent]
})
export class GeoModelModule { }
