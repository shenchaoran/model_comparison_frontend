import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';

import { ProfileRoutingRoutes } from './profile-routing.module';
import { NgxSharedModule } from "../../common/ngx-shared";
import { SharedModule } from "../../common/shared";

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,

    ProfileRoutingRoutes
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }