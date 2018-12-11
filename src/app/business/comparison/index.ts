import { NgModule } from '@angular/core';
import { 
    NgxSharedModule,
    HeaderMenuLayoutModule,
    CustomTemplateModule,
    PipesModule,
    DetailLayoutModule,
    CreateDocModule,
    DirectivesModule,
} from '@shared';
import { OlModule } from '../ol';
// import { HotTableModule } from '@handsontable-pro/angular';
import { CmpSharedModule } from '../cmp-shared';
import { ComparisonRoutingModule } from './index-routing.module';
import { ConversationModule } from '../conversation';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';
import { MatCascaderModule } from '@shared/cascader';
import { CmpMethodsModule } from '../cmp-methods';
import {
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatListModule,
    MatTableModule,
    MatSnackBarModule,
    MatStepperModule,
} from '@angular/material';

import { SolutionListComponent } from './solution-list/solution-list.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { CreateSlnComponent } from './create-sln/create-sln.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CmpCfgComponent } from './cmp-cfg/cmp-cfg.component';
import { TaskInputCfgComponent } from './task-input-cfg/task-input-cfg.component';

const components = [
    SolutionListComponent,
    SolutionDetailComponent,
    CreateTaskComponent,
    CreateSlnComponent,
    CmpCfgComponent,
    TaskInputCfgComponent,
];
const exportComponents = [
    CmpCfgComponent,
    TaskInputCfgComponent,
]
var entryComponents = [];
const modules = [
    NgxSharedModule,
    HeaderMenuLayoutModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    ComparisonRoutingModule,
    CmpSharedModule,
    ConversationModule,
    SimplemdeModule.forRoot(),
    CustomTemplateModule,
    PipesModule,
    DetailLayoutModule,
    CreateDocModule,
    DirectivesModule,
    MatCascaderModule,
    MatTableModule,
    OlModule,
    CmpMethodsModule,
    // HotTableModule.forRoot(),
];
const services = [];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    entryComponents: [...entryComponents],
    providers: [...services],
    exports: [...exportComponents],
})
export class ComparisonModule { }
