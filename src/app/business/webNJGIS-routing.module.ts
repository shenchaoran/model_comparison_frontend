import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../common/core/services/auth.guard";
import { DataInquireService } from "../common/core/services/data.inquire.service";

import { SiderMenuLayoutComponent } from "../common/layout/sider-menu-layout/sider-menu-layout.component";
import { HeaderMenuLayoutComponent } from '../common/layout/header-menu-layout/header-menu-layout.component';

const routes: Routes = [
  {
    path: "",
    component: HeaderMenuLayoutComponent,
    canActivate: [AuthGuard],
    resolve: {
      dataInquireService: DataInquireService,
    },
    children: [
      { 
          path: 'main-window',
          loadChildren: './main-window/main-window.module#MainWindowModule'
      },
      {
        path: ':account',
        loadChildren: './profile/profile.module#ProfileModule'
      },
      {
          path: 'main-window/a',
          loadChildren: './main-window/main-window.module#MainWindowModule'
      },
      {
          path: '**',
          redirectTo: 'main-window'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebNJGISRoutingModule {}
