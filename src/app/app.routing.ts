import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        loadChildren: './business/webNJGIS.module#WebNJGISModule'
    },
    {
        path: 'login',
        loadChildren: './common/feature/login/login.module#LoginModule'
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules
});
