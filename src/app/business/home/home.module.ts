import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared/ngx-shared.module';
import { SharedModule } from '@shared/shared.module';

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
