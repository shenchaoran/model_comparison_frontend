import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared';
import { SharedModule } from '@shared';

import { HomeComponent } from './home.component';
import { FeatureRoutingModule } from './home-routing.module';
import { HomeBannerComponent } from './home-banner/home-banner.component';

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,

    FeatureRoutingModule,
  ],
  declarations: [HomeComponent, HomeBannerComponent]
})
export class HomeModule { }
