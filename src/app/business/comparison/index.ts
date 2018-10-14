import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { MatSharedModule } from '@common/mat-shared';

import { CmpSharedModule } from '../cmp-shared';
import { ComparisonRoutingModule } from './comparison-routing.module';
import { SolutionListComponent } from './solution-list/solution-list.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { MethodDetailComponent } from './method-detail/method-detail.component';
import { MethodListComponent } from './method-list/method-list.component';
import { CreateSlnComponent, SlnConfirmDialog } from './create-sln/create-sln.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskService, MSService, CmpMethodService, SlnService } from '@services';

export * from '@services/sln.service';

@NgModule({
    imports: [
        SharedModule,
        MatSharedModule,
        ComparisonRoutingModule,
        CmpSharedModule,
    ],
    declarations: [
        SolutionListComponent,
        SolutionDetailComponent,
        CreateTaskComponent,
        MethodDetailComponent,
        MethodListComponent,
        CreateSlnComponent,
        SlnConfirmDialog,
    ],
    entryComponents: [
        SlnConfirmDialog
    ],
    providers: [
        SlnService,
        TaskService,
        CmpMethodService,
        NzNotificationService,
        MSService,
    ]
})
export class ComparisonModule { }
