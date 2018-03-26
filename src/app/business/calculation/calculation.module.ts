import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CmpSharedModule } from '../cmp-shared';
import { CalculationRoutingModule } from './calculation-routing.module';

import { CalcuListComponent } from './calcu-list/calcu-list.component';
import { CalcuDetailComponent } from './calcu-detail/calcu-detail.component';

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
        CalculationService
    ]
})
export class CalculationModule { }
