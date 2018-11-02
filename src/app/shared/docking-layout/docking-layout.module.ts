import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';
import { CmpTabsViewComponent } from './cmp-tabs-view/cmp-tabs-view.component';

@NgModule({
  imports: [
    NgxSharedModule,
  ],
  declarations: [
    CmpTabsViewComponent,
  ],
  exports: [
    CmpTabsViewComponent,
  ]
})
export class DockingLayoutModule { }
