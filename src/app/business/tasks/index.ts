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
    MatListModule,
    MatSlideToggleModule,
} from '@angular/material';
import { OlModule } from '../ol';
import { ConversationsModule } from '../conversations';
import { ResultsRoutingModule } from './index-routing.module';
import { CmpListComponent } from './task-list/task-list.component';
import { CmpDetailComponent } from './task-detail/task-detail.component';
import { CmpSharedModule } from '../cmp-shared';
import { ContourMapResultComponent } from './contour-map-result/contour-map-result.component';
import { SolutionsModule } from '../solutions';
import { ServerSideDiagramComponent } from './server-side-diagram/server-side-diagram.component';
import { CmpProgressComponent } from './cmp-progress/cmp-progress.component'

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
    MatListModule,
    MatSlideToggleModule,
    ResultsRoutingModule,
    CmpSharedModule,
    HeaderMenuLayoutModule,
    ConversationsModule,
    DetailLayoutModule,
    CustomTemplateModule,
    DirectivesModule,
    PipesModule,
    OlModule,
    SolutionsModule,
];
const components = [
    CmpListComponent,
    CmpDetailComponent,
    ContourMapResultComponent,
    ServerSideDiagramComponent,
    CmpProgressComponent,
];
const services = [];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    providers: [...services]
})
export class TasksModule { }
