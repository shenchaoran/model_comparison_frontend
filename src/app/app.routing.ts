import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadChildren: './common/feature/login/login.module#LoginModule'
      },
      {
        path: 'webNJGIS',
        loadChildren: './business/webNJGIS.module#WebNJGISModule'
      },
      {
          path: '**',
          redirectTo: 'login',
          pathMatch: 'full'
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true,
  preloadingStrategy: PreloadAllModules
});
