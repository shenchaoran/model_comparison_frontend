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
import { CmpSharedModule } from '../cmp-shared';
import { ComparisonRoutingModule } from './index-routing.module';
import { ConversationModule } from '../conversation';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';
import { MatCascaderModule } from '@shared/cascader';
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
} from '@angular/material';

import { SolutionListComponent } from './solution-list/solution-list.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { MethodDetailComponent } from './method-detail/method-detail.component';
import { MethodListComponent } from './method-list/method-list.component';
import { CreateSlnComponent } from './create-sln/create-sln.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CmpObjCfgComponent } from './cmp-obj-cfg/cmp-obj-cfg.component';

const components = [
    SolutionListComponent,
    SolutionDetailComponent,
    CreateTaskComponent,
    MethodDetailComponent,
    MethodListComponent,
    CreateSlnComponent,
    CmpObjCfgComponent,
];
var entryComponents = [];
const modules = [
    NgxSharedModule,
    HeaderMenuLayoutModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
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
];
const services = [];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    entryComponents: [...entryComponents],
    providers: [...services]
})
export class ComparisonModule { }
