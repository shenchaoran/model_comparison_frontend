import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { MatSharedModule } from '@common/mat-shared';

import { ResultsRoutingModule } from './index-routing.module';
import { CalcuListComponent } from './calcu-list/calcu-list.component';
import { CmpListComponent } from './cmp-list/cmp-list.component';
import { CalcuDetailComponent } from './calcu-detail/calcu-detail.component';
import { CmpDetailComponent } from './cmp-detail/cmp-detail.component';
import { TaskService } from '@services/task.service';
import { MSRService } from '@services/msr.service';
import { SlnService } from '../comparison';
import { CmpSharedModule } from '../cmp-shared';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

@NgModule({
    imports: [
        SharedModule,
        ResultsRoutingModule,
        CmpSharedModule,
        MatSharedModule,
    ],
    declarations: [
        CalcuListComponent,
        CmpListComponent,
        CalcuDetailComponent,
        CmpDetailComponent,
    ],
    providers: [
        SlnService,
        TaskService,
        MSRService,
        NzNotificationService,
    ]
})
export class ResultsModule { }
