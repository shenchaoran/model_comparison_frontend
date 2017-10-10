import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { MainWindowComponent } from './main-window.component';
// import { ToolLibTreeComponent } from './component/tool-lib-tree/tool-lib-tree.component';

const routes: Routes = [
  {
      path: '',
      component: MainWindowComponent,
      children: [
          {
            path: '',
            loadChildren: '../../common/feature/map/map.module#MapModule'
          }
      ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class MainWindowRoutingRoutes {}
// export const MainWindowRoutingRoutes = RouterModule.forChild(routes);
