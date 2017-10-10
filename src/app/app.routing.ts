import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { RootService } from './common/core/services/root.service';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'login',
		loadChildren: './common/feature/login/login.module#LoginModule',
		resolve: {
            rootService: RootService
        }
    },
    {
        path: 'webNJGIS',
        loadChildren: './business/webNJGIS.module#WebNJGISModule'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
	useHash: true,
	preloadingStrategy: PreloadAllModules
});
