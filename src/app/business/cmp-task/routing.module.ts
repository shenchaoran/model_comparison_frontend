import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmpTaskListComponent } from './cmp-task-list/cmp-task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { SiderMenuLayoutComponent, HeaderMenuLayoutComponent } from '@shared';
import { NewTaskComponent } from './new-task/new-task.component';
import { CmpTaskService } from './services';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            { 
                path: '', 
                component: CmpTaskListComponent,
                resolve: {
                    tasks: CmpTaskService
                }
            }, 
            {
                path: 'new',
                component: NewTaskComponent
            },
            {
                path: ':id',
                component: TaskDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class CmpTaskListRoutingModule {
}