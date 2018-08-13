import { MethodDetailComponent } from './method-detail/method-detail.component';
import { MethodListComponent } from './method-list/method-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { TaskConfigComponent } from './task-config/task-config.component';
import { SolutionListComponent } from './solution-list/solution-list.component';
import { HeaderMenuLayoutComponent, DocDetailTemplateComponent } from '@shared';

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
                path: 'methods/:id',
                component: DocDetailTemplateComponent,
                children: [{
                    path: '',
                    component: MethodDetailComponent,
                    data: {
                        title: 'Comporison Method'
                    }
                }]
            },
            {
                path: 'solutions',
                component: SolutionListComponent,
                data: {
                    title: 'Comparison Solutions'
                }
            },
            {
                path: 'solutions/:id',
                component: DocDetailTemplateComponent,
                children: [{
                    path: '',
                    component: SolutionDetailComponent,
                    data: {
                        title: 'Comparison Solution'
                    }
                }]
            },
            {
                path: 'solutions/:id/invoke',
                component: TaskConfigComponent,
                data: {
                    title: 'Comparison Task Configure'
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
