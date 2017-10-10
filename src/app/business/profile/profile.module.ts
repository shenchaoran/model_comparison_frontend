import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';

import { ProfileRoutingRoutes } from './profile-routing.module';
import { NgxSharedModule } from "../../common/ngx-shared/ngx-shared.module";
import { SharedModule } from "../../common/shared/shared.module";

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,

    ProfileRoutingRoutes
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }