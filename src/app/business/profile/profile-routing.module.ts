import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { HeaderMenuLayoutComponent } from '@common/shared';

const routes: Routes = [
  {
      path: '',
      component: HeaderMenuLayoutComponent,
      children: [
          {
            path: '',
            component: ProfileComponent
          }
      ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ProfileRoutingRoutes {}
// export const MainWindowRoutingRoutes = RouterModule.forChild(routes);
