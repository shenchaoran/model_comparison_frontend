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

import { CmpSlnService, CmpTaskService, CmpSceneService } from './services';
import { MSService } from '../geo-model/services';
import { FormKeynoteComponent } from './form-keynote/form-keynote.component';
import { FormCmpObjsComponent } from './form-cmp-objs/form-cmp-objs.component';
import { FormCmpTaskComponent } from './form-cmp-task/form-cmp-task.component';
import { StringPipe } from '@shared/pipes';
import { FormCmpObjsModalComponent } from './form-cmp-objs-modal/form-cmp-objs-modal.component';
import { LoginService } from '@feature/login/login.service';
import { NewTaskComponent } from './new-task/new-task.component';
import { DataService } from '../geo-data/services';
import {
  OlMapModule,
  OlMapComponent,
  LayoutComponent,
  OlMapService,
  RegionMapService,
  ToolbarService,
  GeoJSONService,
} from '@feature/ol-map/ol-map.module';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { FormParticipantsComponent } from './form-participants/form-participants.component';
import { RegionMapComponent } from './region-map/region-map.component';
import { SlnDetailComponent } from './sln-detail/sln-detail.component';

const SERVICES = [
  CmpSlnService,
  CmpTaskService,
  CmpSceneService,
  MSService,
  LoginService,
  DataService,
  // 下面这两个服务和OlMapComponent依赖的是同一个实例
  OlMapService,
  ToolbarService,
//   GeoJSONService,
//   RegionMapService,
];

@NgModule({
  imports: [
      NgxSharedModule, 
      SharedModule, 
      CmpRoutingModule, 
      OlMapModule
    ],
  declarations: [
    ComparisonComponent,
    CmpSolutionComponent,
    NewSolutionComponent,
    CmpTaskComponent,
    CmpSceneComponent,
    ResourceTabsComponent,
    FormKeynoteComponent,
    FormCmpObjsComponent,
    FormCmpTaskComponent,
    StringPipe,
    FormCmpObjsModalComponent,
    NewTaskComponent,
    TaskDetailComponent,
    FormParticipantsComponent,
    SlnDetailComponent,
    RegionMapComponent,
  ],
  providers: [...SERVICES]
})
export class ComparisonModule {}
