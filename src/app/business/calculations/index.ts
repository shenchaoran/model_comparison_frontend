import { NgModule } from '@angular/core';
import { CalculationRoutingModule } from './calculation-routing.module';
import { CalcuListComponent } from './calcu-list/calcu-list.component';
import { CalcuDetailComponent } from './calcu-detail/calcu-detail.component';
import { ConversationsModule } from '../conversations';

import { 
    HeaderMenuLayoutModule,
    NgxSharedModule,
    CustomTemplateModule,
    DirectivesModule,
    PipesModule,
    DetailLayoutModule,
} from '@shared';
import {
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatGridListModule,
    MatTabsModule,
    MatButtonModule,
    MatSliderModule,
    MatCheckboxModule,
    MatListModule,
    MatSlideToggleModule,
} from '@angular/material';
import { CmpSharedModule } from '../cmp-shared';

const modules = [
    CalculationRoutingModule,
    NgxSharedModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatGridListModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatListModule,
    MatSlideToggleModule,
    HeaderMenuLayoutModule,
    ConversationsModule,
    CustomTemplateModule,
    DirectivesModule,
    PipesModule,
    DetailLayoutModule,
    CmpSharedModule,
];
const components = [
    CalcuListComponent,
    CalcuDetailComponent,
];
const services = [];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    providers: [...services]
})
export class CalculationsModule { }
