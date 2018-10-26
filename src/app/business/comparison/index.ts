import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MatSharedModule } from '@mat-shared';

import { CmpSharedModule } from '../cmp-shared';
import { ComparisonRoutingModule } from './index-routing.module';
import { ConversationModule } from '../conversation';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';

import { SolutionListComponent } from './solution-list/solution-list.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { MethodDetailComponent } from './method-detail/method-detail.component';
import { MethodListComponent } from './method-list/method-list.component';
import { CreateSlnComponent } from './create-sln/create-sln.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { SlnConfigComponent } from './sln-config/sln-config.component';

const components = [
    SolutionListComponent,
    SolutionDetailComponent,
    CreateTaskComponent,
    MethodDetailComponent,
    MethodListComponent,
    CreateSlnComponent,
    SlnConfigComponent,
];
var entryComponents = [];
const modules = [
    SharedModule,
    MatSharedModule,
    ComparisonRoutingModule,
    CmpSharedModule,
    ConversationModule,
    SimplemdeModule.forRoot(),
];
const services = [];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    entryComponents: [...entryComponents],
    providers: [...services]
})
export class ComparisonModule { }
