import { Routes, RouterModule, PreloadAllModules, } from '@angular/router';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { HomeModule } from './business/home';
import { CalculationsModule } from './business/calculations'
import { CmpMethodsModule } from './business/cmp-methods'
import { CmpSharedModule } from './business/cmp-shared'
import { ConversationsModule } from './business/conversations'
import { DatasetsModule } from './business/datasets'
import { ModelsModule } from './business/ms'
import { OlModule } from './business/ol'
import { SearchModule } from './business/search'
import { SolutionsModule } from './business/solutions'
import { TasksModule } from './business/tasks'
import { TopicsModule } from './business/topics'
import { UsersModule } from './business/users'

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
        path: 'map',
        loadChildren: './business/ol/index#OlModule'
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

let opt = {
    preloadingStrategy: PreloadAllModules,
    useHash: true
}

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }