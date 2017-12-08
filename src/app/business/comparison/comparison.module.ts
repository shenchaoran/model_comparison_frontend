import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSharedModule } from '@ngx-shared';
import { SharedModule } from '@shared';

import { CmpRoutingModule } from './comparison-routing.module';
import { ComparisonComponent } from './comparison.component';
import { CmpSolutionComponent } from './cmp-solution/cmp-solution.component';
import { NewSolutionComponent } from './new-solution/new-solution.component';
import { CmpTaskComponent } from './cmp-task/cmp-task.component';
import { CmpSceneComponent } from './cmp-scene/cmp-scene.component';
import { ResourceTabsComponent } from './resource-tabs/resource-tabs.component';
import { SlnIntroComponent } from './sln-intro/sln-intro.component';
import { TaskIntroComponent } from './task-intro/task-intro.component';

import { CmpSlnService, CmpTaskService, CmpSceneService } from './services';

const SERVICES = [CmpSlnService, CmpTaskService, CmpSceneService];

@NgModule({
    imports: [
        NgxSharedModule, 
        SharedModule, 
        CmpRoutingModule
    ],
    declarations: [
        ComparisonComponent,
        CmpSolutionComponent,
        NewSolutionComponent,
        CmpTaskComponent,
        CmpSceneComponent,
        ResourceTabsComponent,
        SlnIntroComponent,
        TaskIntroComponent
    ],
    providers: [...SERVICES]
})
export class ComparisonModule {}
