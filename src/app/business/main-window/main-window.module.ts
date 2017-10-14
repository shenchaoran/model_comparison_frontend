import { NgModule } from "@angular/core";
import { NzNotificationService } from 'ng-zorro-antd';

import { MainWindowRoutingRoutes } from "./main-window-routing.module";
import { NgxSharedModule } from "../../common/ngx-shared/ngx-shared.module";
import { SharedModule } from "../../common/shared/shared.module";

import {
  MainWindowComponent,
  SiderTabsComponent,
  ModelToolLibTreeComponent,
  ModelToolLibListComponent,
  DataToolLibListComponent,
  ModelInvokeConfigComponent,
  
} from "./index";

import {
    ModelToolService,
    DataToolService,
} from './services/index';

const COMPONENTS = [
  MainWindowComponent,
  SiderTabsComponent,
  ModelToolLibTreeComponent,
  ModelToolLibListComponent,
  DataToolLibListComponent,
  ModelInvokeConfigComponent
];

const SERVICES = [
    ModelToolService, 
    DataToolService,
    NzNotificationService
];

@NgModule({
  imports: [NgxSharedModule, SharedModule, MainWindowRoutingRoutes],
  declarations: [...COMPONENTS],
  providers: [...SERVICES]
})
export class MainWindowModule {}
