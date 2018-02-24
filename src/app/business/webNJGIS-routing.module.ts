import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../common/core/services/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
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
                loadChildren: './geo-model/geo-model.module#GeoModelModule'
            },
            {
                path: 'geo-data',
                loadChildren: './geo-data/geo-data.module#GeoDataModule'
            },
        ]
    },
    {
        path: 'issues',
        loadChildren: './cmp-issue/cmp-issue.module#CmpIssueModule'
    },
    {
        path: 'solutions',
        loadChildren: './cmp-solution/cmp-solution.module#CmpSolutionModule'
    },
    
    {
        path: 'tasks',
        loadChildren: './cmp-task/cmp-task.module#CmpTaskModule'
    },
    {
        path: 'comparison',
        loadChildren: './comparison/comparison.module#ComparisonModule'
    },
    {
        path: 'help',
        loadChildren: './help/help.module#HelpModule'
    },
    {
        path: 'users/:username',
        loadChildren: './profile/profile.module#ProfileModule'
    },
    {
        path: 'test',
        loadChildren: './test/test.module#TestModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebNJGISRoutingModule {}
