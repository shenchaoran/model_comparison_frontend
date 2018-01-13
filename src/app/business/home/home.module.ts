import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared';
import { SharedModule } from '@shared';

import { HomeComponent } from './home.component';
import { FeatureRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,

    FeatureRoutingModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
