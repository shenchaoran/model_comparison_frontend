import { MethodDetailComponent } from './method-detail/method-detail.component';
import { MethodListComponent } from './method-list/method-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { SolutionListComponent } from './solution-list/solution-list.component';
import { HeaderMenuLayoutComponent } from '@shared';
import { CreateSlnComponent } from './create-sln/create-sln.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'methods',
                pathMatch: 'full'
            },
            {
                path: 'methods',
                component: MethodListComponent,
                data: {
                    title: 'Comparison Methods'
                }
            },
            {
                path: 'solutions',
                component: SolutionListComponent,
                data: {
                    title: 'Comparison Solutions'
                }
            },
            {
                path: 'methods/:id',
                component: MethodDetailComponent,
                data: {
                    title: 'Comporison Method'
                }
            },
            {
                path: 'solutions/create',
                component: CreateSlnComponent,
                data: {
                    title: 'Create Solution'
                }
            },
            {
                path: 'solutions/:id',
                component: SolutionDetailComponent,
                data: {
                    title: 'Comparison Solution'
                }
            },
            {
                path: 'solutions/:id/invoke',
                component: CreateTaskComponent,
                data: {
                    title: 'Comparison Task Configuration'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComparisonRoutingModule { }
