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
import { MSService } from '../geo-model/services';
import { FormKeynoteComponent } from './form-keynote/form-keynote.component';
import { FormCmpObjsComponent } from './form-cmp-objs/form-cmp-objs.component';
import { FormCmpTaskComponent } from './form-cmp-task/form-cmp-task.component';
import { FormSlnOutlineComponent } from './form-sln-outline/form-sln-outline.component';
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
  ToolbarService,
} from '@feature/ol-map/ol-map.module';
import { NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

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
];

@NgModule({
  imports: [NgxSharedModule, SharedModule, CmpRoutingModule, OlMapModule],
  declarations: [
    ComparisonComponent,
    CmpSolutionComponent,
    NewSolutionComponent,
    CmpTaskComponent,
    CmpSceneComponent,
    ResourceTabsComponent,
    SlnIntroComponent,
    TaskIntroComponent,
    FormKeynoteComponent,
    FormCmpObjsComponent,
    FormCmpTaskComponent,
    FormSlnOutlineComponent,
    StringPipe,
    FormCmpObjsModalComponent,
    NewTaskComponent
    // OlMapComponent,
    // LayoutComponent,
  ],
  providers: [...SERVICES]
})
export class ComparisonModule {}
