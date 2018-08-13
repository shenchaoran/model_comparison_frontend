import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpSolutionListComponent } from './cmp-solution-list/cmp-solution-list.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { CmpSolutionListRoutingModule } from './cmp-solution-routing.module';
import { SharedModule } from '@shared';
import { CmpSlnService } from './services';
import { CmpSolutionComponent } from './cmp-solution.component';
import { MSService } from '../models/services/geo-models.service';
import { OlMapModule } from '@feature/ol-map/ol-map.module';
import { CmpSharedModule } from '../cmp-shared';
import { CmpTaskService } from '../cmp-task/services';
import { CalcuCfgComponent } from '../cmp-shared';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

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
    ],
    providers: [
        CmpSlnService,
        MSService,
        CmpTaskService,
        NzNotificationService,
    ],
    entryComponents: [
        CalcuCfgComponent,
    ]
})
export class CmpSolutionModule {}
