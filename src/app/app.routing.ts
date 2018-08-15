import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },

    {
        path: 'login',
        loadChildren: './common/feature/login/login.module#LoginModule'
    },
    {
        path: 'join',
        loadChildren: './common/feature/sign-up/sign-up.module#SignUpModule'
    },
    {
        path: 'password-reset',
        loadChildren: './common/feature/password-reset/password-reset.module#PasswordResetModule'
    },

    {
        path: 'home',
        loadChildren: './business/home/home.module#HomeModule'
    },

    {
        path: 'datasets',
        loadChildren: './business/datasets/datasets.module#DatasetsModule'
    },
    {
        path: 'models',
        loadChildren: './business/models/models.module#ModelsModule'
    },
    {
        path: 'comparison',
        loadChildren: './business/comparison/comparison.module#ComparisonModule'
    },
    {
        path: 'results',
        loadChildren: './business/results/results.module#ResultsModule'
    },
    
    {
        path: 'search',
        loadChildren: './business/search/search.module#SearchModule'
    },
    {
        path: 'users/:username',
        loadChildren: './business/profile/profile.module#ProfileModule'
    },
    {
        path: 'test',
        loadChildren: './business/test/test.module#TestModule'
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    useHash: true
});
