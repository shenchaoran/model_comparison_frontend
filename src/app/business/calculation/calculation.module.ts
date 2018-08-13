import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CmpSharedModule } from '../cmp-shared';
import { CalculationRoutingModule } from './calculation-routing.module';

import { CalcuListComponent } from './calcu-list/calcu-list.component';
import { CalcuDetailComponent } from './calcu-detail/calcu-detail.component';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

import { CalculationService } from './calculation.service';

@NgModule({
    imports: [
        SharedModule,
        CalculationRoutingModule,
        CmpSharedModule,

    ],
    declarations: [
        CalcuListComponent,
        CalcuDetailComponent,
    ],
    providers: [
        CalculationService,
        NzNotificationService,
        
    ]
})
export class CalculationModule { }
