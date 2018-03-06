import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpTaskListComponent } from './cmp-task-list/cmp-task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { CmpTaskListRoutingModule } from './cmp-task-routing.module';
import { SharedModule } from '@shared';
import { NewTaskComponent } from './new-task/new-task.component';
import { CmpTaskService } from './services';
import { OlMapModule } from '@feature/ol-map/ol-map.module';
import { CmpSlnService } from "../cmp-solution/services/cmp-sln.service";
import { MSService } from "../geo-model/services/model.service";

@NgModule({
  imports: [
    SharedModule,
    CmpTaskListRoutingModule,
    OlMapModule,
  ],
  declarations: [CmpTaskListComponent, TaskDetailComponent, NewTaskComponent],
  providers: [
    CmpTaskService,
    CmpSlnService,
    MSService
  ]
})
export class CmpTaskModule { }
