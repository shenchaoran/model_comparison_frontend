import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { MatSharedModule } from '@common/mat-shared';

import { CmpSharedModule } from '../cmp-shared';
import { ComparisonRoutingModule } from './index-routing.module';

import { SolutionListComponent } from './solution-list/solution-list.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { MethodDetailComponent } from './method-detail/method-detail.component';
import { MethodListComponent } from './method-list/method-list.component';
import { CreateSlnComponent, SlnConfirmDialog } from './create-sln/create-sln.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const components = [
    SolutionListComponent,
    SolutionDetailComponent,
    CreateTaskComponent,
    MethodDetailComponent,
    MethodListComponent,
    CreateSlnComponent,
    SlnConfirmDialog,
];
var entryComponents = [
    SlnConfirmDialog
];
const modules = [
    SharedModule,
    MatSharedModule,
    ComparisonRoutingModule,
    CmpSharedModule,
];
const services = [];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    entryComponents: [...entryComponents],
    providers: [...services]
})
export class ComparisonModule { }
