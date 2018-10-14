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
        loadChildren: './business/user/index#UserModule'
    },
    {
        path: 'home',
        loadChildren: './business/home/index#HomeModule'
    },
    {
        path: 'datasets',
        loadChildren: './business/datasets/index#DatasetsModule'
    },
    {
        path: 'models',
        loadChildren: './business/models/index#ModelsModule'
    },
    {
        path: 'comparison',
        loadChildren: './business/comparison/index#ComparisonModule'
    },
    {
        path: 'results',
        loadChildren: './business/results/index#ResultsModule'
    },
    {
        path: 'search',
        loadChildren: './business/search/index#SearchModule'
    },
    {
        path: 'test',
        loadChildren: './business/test/index#TestModule'
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
