import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpSolutionListComponent } from './cmp-solution-list/cmp-solution-list.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { CmpSolutionListRoutingModule } from './routing.module';
import { SharedModule } from '@shared';
import { CmpSlnService } from './services';
import { NewSlnComponent } from './new-sln/new-sln.component';
import { CmpSolutionComponent } from './cmp-solution.component';
import { OlMapModule } from '@feature/ol-map/ol-map.module';

@NgModule({
    imports: [SharedModule, OlMapModule, CmpSolutionListRoutingModule],
    declarations: [
        CmpSolutionComponent,
        CmpSolutionListComponent,
        SolutionDetailComponent,
        NewSlnComponent
    ],
    providers: [CmpSlnService]
})
export class CmpSolutionModule {}
