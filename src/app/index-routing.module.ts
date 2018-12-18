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
        loadChildren: './business/users/index#UsersModule'
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
        path: 'solutions',
        loadChildren: './business/solutions/index#SolutionsModule'
    },
    {
        path: 'results',
        loadChildren: './business/tasks/index#TasksModule'
    },
    {
        path: 'calculations',
        loadChildren: './business/calculations/index#CalculationsModule'
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
        loadChildren: './business/topics/index#TopicsModule'
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