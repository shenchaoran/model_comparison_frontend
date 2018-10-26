import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MatSharedModule } from '@mat-shared';

import { ResultsRoutingModule } from './index-routing.module';
import { CalcuListComponent } from './calcu-list/calcu-list.component';
import { CmpListComponent } from './cmp-list/cmp-list.component';
import { CalcuDetailComponent } from './calcu-detail/calcu-detail.component';
import { CmpDetailComponent } from './cmp-detail/cmp-detail.component';
import { CmpSharedModule } from '../cmp-shared';

const modules = [
    SharedModule,
    ResultsRoutingModule,
    CmpSharedModule,
    MatSharedModule,
];
const components = [
    CalcuListComponent,
    CmpListComponent,
    CalcuDetailComponent,
    CmpDetailComponent,
];
const services = [];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    providers: [...services]
})
export class ResultsModule { }
