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
        path: 'home',
        loadChildren: './business/home/home.module#HomeModule'
    },
    {
        path: 'resources',
        children: [
            {
                path: '',
                redirectTo: 'geo-models',
                pathMatch: 'full'
            },
            {
                path: 'geo-models',
                loadChildren: './business/geo-model/geo-model.module#GeoModelModule'
            },
            {
                path: 'geo-data',
                loadChildren: './business/geo-data/geo-data.module#GeoDataModule'
            },
        ]
    },
    {
        path: 'issues',
        loadChildren: './business/cmp-issue/cmp-issue.module#CmpIssueModule'
    },
    {
        path: 'solutions',
        loadChildren: './business/cmp-solution/cmp-solution.module#CmpSolutionModule'
    },

    {
        path: 'tasks',
        loadChildren: './business/cmp-task/cmp-task.module#CmpTaskModule'
    },
    {
        path: 'comparison',
        loadChildren: './business/comparison/comparison.module#ComparisonModule'
    },
    {
        path: 'search',
        loadChildren: './business/search/search.module#SearchModule'
    },
    {
        path: 'help',
        loadChildren: './business/help/help.module#HelpModule'
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
