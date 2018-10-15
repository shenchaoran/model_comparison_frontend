import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderMenuLayoutComponent } from '@shared/components/header-menu-layout/header-menu-layout.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: IssueListComponent
            },
            {
                path: ':id',
                component: IssueDetailComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueRoutingModule { }
