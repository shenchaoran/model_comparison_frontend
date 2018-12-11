import { Routes, RouterModule, } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './business/home/index#HomeModule'
    },
    {
        path: 'user',
        loadChildren: './business/user/index#UserModule'
    },
    {
        path: 'datasets',
        loadChildren: './business/datasets/index#DatasetsModule'
    },
    {
        path: 'models',
        loadChildren: './business/ms/index#ModelsModule'
    },
    {
        path: 'cmp-methods',
        loadChildren: './business/cmp-methods/index#CmpMethodsModule'
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
        path: 'topics',
        loadChildren: './business/topic/index#TopicModule'
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }