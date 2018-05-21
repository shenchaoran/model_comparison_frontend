import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { TaskConfigComponent } from './task-config/task-config.component';
import { SolutionListComponent } from './solution-list/solution-list.component';
import { HeaderMenuLayoutComponent } from '@shared';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: SolutionListComponent,
                data: {
                    title: 'Comparison Solution'
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
                component: TaskConfigComponent,
                data: {
                    title: 'Comparison Configure'
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
