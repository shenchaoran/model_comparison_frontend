import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSharedModule } from '@ngx-shared';
import { SharedModule } from '@shared';

import { CmpRoutingModule } from './comparison-routing.module';
import { ComparisonComponent } from './comparison.component';
import { CmpSolutionComponent } from './cmp-solution/cmp-solution.component';
import { CmpExampleComponent } from './cmp-example/cmp-example.component';
import { StartCmpComponent } from './start-cmp/start-cmp.component';

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,

    CmpRoutingModule,
  ],
  declarations: [ComparisonComponent, CmpSolutionComponent, CmpExampleComponent, StartCmpComponent]
})
export class ComparisonModule { }
