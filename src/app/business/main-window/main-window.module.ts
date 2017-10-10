import { NgModule } from "@angular/core";

import { MainWindowRoutingRoutes } from "./main-window-routing.module";
import { NgxSharedModule } from "../../common/ngx-shared/ngx-shared.module";
import { SharedModule } from "../../common/shared/shared.module";


import {
    MainWindowComponent,
    SiderTabsComponent,
    ToolLibTreeComponent,
}
from './index';

const COMPONENTS = [
    MainWindowComponent,
    SiderTabsComponent,
    ToolLibTreeComponent,
];

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,

    MainWindowRoutingRoutes
  ],
  declarations: [
       ...COMPONENTS,
    ]
})
export class MainWindowModule {}
