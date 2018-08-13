import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { TaskConfigComponent } from './task-config/task-config.component';
import { SolutionListComponent } from './solution-list/solution-list.component';
import { HeaderMenuLayoutComponent } from '@shared';
import { CmpMethodsComponent } from './cmp-methods/cmp-methods.component'

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'cmp-methods',
                pathMatch: 'full'
            },
            {
                path: 'cmp-methods',
                component: CmpMethodsComponent,
                data: {
                    title: 'Comparison Methods'
                }
            },
            {
                path: 'cmp-solutions',
                component: SolutionListComponent,
                data: {
                    title: 'Comparison Solutions'
                },
                children: [   
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
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComparisonRoutingModule { }
