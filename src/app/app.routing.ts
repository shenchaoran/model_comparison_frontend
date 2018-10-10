import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'user',
        loadChildren: './business/user/user.module#UserModule'
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
        path: 'test',
        loadChildren: './business/test/test.module#TestModule'
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
