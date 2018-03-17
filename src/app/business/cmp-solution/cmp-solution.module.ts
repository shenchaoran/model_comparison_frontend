import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpSolutionListComponent } from './cmp-solution-list/cmp-solution-list.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { CmpSolutionListRoutingModule } from './cmp-solution-routing.module';
import { SharedModule } from '@shared';
import { CmpSlnService } from './services';
import { NewSlnComponent } from './new-sln/new-sln.component';
import { CmpSolutionComponent } from './cmp-solution.component';
import { OlMapModule } from '@feature/ol-map/ol-map.module';
import { MSService } from '../geo-model/services/model.service';
import { CmpSharedModule } from '../cmp-shared';
import { CmpTaskService } from '../cmp-task/services';

@NgModule({
    imports: [
        SharedModule, 
        OlMapModule, 
        CmpSolutionListRoutingModule,
        CmpSharedModule,
    ],
    declarations: [
        CmpSolutionComponent,
        CmpSolutionListComponent,
        SolutionDetailComponent,
        NewSlnComponent
    ],
    providers: [
        CmpSlnService,
        MSService,
        CmpTaskService,
    ]
})
export class CmpSolutionModule {}
