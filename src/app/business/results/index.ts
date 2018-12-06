import { NgModule } from '@angular/core';
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
} from '@angular/material';
import { OlModule } from '../ol';
import { ConversationModule } from '../conversation';
import { ResultsRoutingModule } from './index-routing.module';
import { CalcuListComponent } from './calcu-list/calcu-list.component';
import { CmpListComponent } from './cmp-list/cmp-list.component';
import { CalcuDetailComponent } from './calcu-detail/calcu-detail.component';
import { CmpDetailComponent } from './cmp-detail/cmp-detail.component';
import { CmpSharedModule } from '../cmp-shared';
import { ContourMapResultComponent } from './contour-map-result/contour-map-result.component';

const modules = [
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
    ResultsRoutingModule,
    CmpSharedModule,
    HeaderMenuLayoutModule,
    ConversationModule,
    DetailLayoutModule,
    CustomTemplateModule,
    DirectivesModule,
    PipesModule,
    OlModule,
];
const components = [
    CalcuListComponent,
    CmpListComponent,
    CalcuDetailComponent,
    CmpDetailComponent,
    ContourMapResultComponent,
];
const services = [];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    providers: [...services]
})
export class ResultsModule { }
