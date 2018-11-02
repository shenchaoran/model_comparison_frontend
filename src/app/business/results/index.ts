import { NgModule } from '@angular/core';
import { 
    HeaderMenuLayoutModule,
    NgxSharedModule,
    CustomTemplateModule,
    DirectivesModule,
    PipesModule,
} from '@shared';
import {
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
} from '@angular/material';
// import {
//     // NzGridModule,
//     // NzProgressModule,
//     // NzTableModule,
//     NgZorroAntdModule,
// } from 'ng-zorro-antd';

import { ResultsRoutingModule } from './index-routing.module';
import { CalcuListComponent } from './calcu-list/calcu-list.component';
import { CmpListComponent } from './cmp-list/cmp-list.component';
import { CalcuDetailComponent } from './calcu-detail/calcu-detail.component';
import { CmpDetailComponent } from './cmp-detail/cmp-detail.component';
import { CmpSharedModule } from '../cmp-shared';

const modules = [
    NgxSharedModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    // NzGridModule,
    // NzProgressModule,
    // NzTableModule,
    // NgZorroAntdModule,
    ResultsRoutingModule,
    CmpSharedModule,
    HeaderMenuLayoutModule,
    CustomTemplateModule,
    DirectivesModule,
    PipesModule,
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
