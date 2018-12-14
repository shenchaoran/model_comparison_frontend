
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
                component: SolutionListComponent,
                data: {
                    title: 'Comparison Solutions'
                }
            },
            {
                path: 'create',
                component: CreateSlnComponent,
                data: {
                    title: 'Create Solution'
                }
            },
            {
                path: ':id',
                component: SolutionDetailComponent,
                data: {
                    title: 'Comparison Solution'
                }
            },
            {
                path: ':id/invoke',
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
