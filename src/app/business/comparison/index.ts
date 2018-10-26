import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { MatSharedModule } from '@common/mat-shared';

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

const components = [
    SolutionListComponent,
    SolutionDetailComponent,
    CreateTaskComponent,
    MethodDetailComponent,
    MethodListComponent,
    CreateSlnComponent,
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
const services = [
    // {
    //     provide: 'MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS',
    //     useValue: {
    //         diameter: 40
    //     }
    // },
];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    entryComponents: [...entryComponents],
    providers: [...services]
})
export class ComparisonModule { }
