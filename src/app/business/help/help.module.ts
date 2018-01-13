import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared/ngx-shared.module';
import { SharedModule } from '@shared/shared.module';

import { HelpComponent } from './help.component';
import { HelpRoutingModule } from './help-routing.module';

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,
    
    HelpRoutingModule,
  ],
  declarations: [HelpComponent]
})
export class HelpModule { }
