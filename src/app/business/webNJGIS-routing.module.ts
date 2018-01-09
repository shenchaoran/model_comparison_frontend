import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../common/core/services/auth.guard';

import {
  SiderMenuLayoutComponent,
  HeaderMenuLayoutComponent
} from '@common/layout';

const routes: Routes = [
  {
    path: '',
    component: HeaderMenuLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'geo-models',
        loadChildren: './geo-model/geo-model.module#GeoModelModule'
      },
      {
        path: 'geo-data',
        loadChildren: './geo-data/geo-data.module#GeoDataModule'
      },
      {
        path: 'comparison',
        loadChildren: './comparison/comparison.module#ComparisonModule'
      },
      {
        path: 'help',
        loadChildren: './help/help.module#HelpModule'
      },
      {
        path: 'users/:username',
        loadChildren: './profile/profile.module#ProfileModule'
      }
      // {
      //     path: '**',
      //     redirectTo: 'home'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebNJGISRoutingModule {}
