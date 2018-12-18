import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmpDetailComponent } from './task-detail/task-detail.component';
import { CmpListComponent } from './task-list/task-list.component';
import { HeaderMenuLayoutComponent } from '@shared';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: CmpListComponent,
                data: {
                    title: 'Results & Diagnostics'
                }
            },
            {
                path: ':id',
                component: CmpDetailComponent,
                data: {
                    title: 'Results & Diagnostics'
                }
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
