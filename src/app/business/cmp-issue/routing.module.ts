import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmpIssueListComponent } from './cmp-issue-list/cmp-issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { SiderMenuLayoutComponent, HeaderMenuLayoutComponent } from '@shared';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            { 
                path: '', 
                component: CmpIssueListComponent 
            }, 
            {
                path: ':id',
                component: IssueDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class CmpIssueListRoutingModule {
}