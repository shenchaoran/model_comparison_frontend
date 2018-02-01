import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpSolutionListComponent } from './cmp-solution-list/cmp-solution-list.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { CmpSolutionListRoutingModule } from './routing.module';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    SharedModule,
    CmpSolutionListRoutingModule
  ],
  declarations: [CmpSolutionListComponent, SolutionDetailComponent]
})
export class CmpSolutionModule { }
