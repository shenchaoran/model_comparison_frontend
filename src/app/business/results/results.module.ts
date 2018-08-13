import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { ResultsRoutingModule } from './results-routing.module';
import { CalcuListComponent } from './calcu-list/calcu-list.component';
import { CmpListComponent } from './cmp-list/cmp-list.component';
import { CalcuDetailComponent } from './calcu-detail/calcu-detail.component';
import { CmpDetailComponent } from './cmp-detail/cmp-detail.component';
import { CmpTaskService } from './services/cmp-task.service';
import { CalcuTaskService } from './services/calcu-task.service';
import { CmpSlnService } from '../comparison/comparison.module';
import { CmpSharedModule } from '../cmp-shared';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

export * from './services/cmp-task.service';
export * from './services/calcu-task.service';

@NgModule({
    imports: [
        SharedModule,
        ResultsRoutingModule,
        CmpSharedModule,
    ],
    declarations: [
        CalcuListComponent,
        CmpListComponent,
        CalcuDetailComponent,
        CmpDetailComponent,
    ],
    providers: [
        CmpSlnService,
        CmpTaskService,
        CalcuTaskService,
        NzNotificationService,
    ]
})
export class ResultsModule { }
