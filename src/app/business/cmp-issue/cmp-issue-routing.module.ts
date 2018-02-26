import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmpIssueListComponent } from './cmp-issue-list/cmp-issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { SiderMenuLayoutComponent, HeaderMenuLayoutComponent } from '@shared';
import { NewIssueComponent } from './new-issue/new-issue.component';
import { CmpIssueService } from './services';
import { CmpIssueComponent } from './cmp-issue.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderMenuLayoutComponent,
        children: [
            {
                path: '',
                component: CmpIssueComponent,
                children: [
                    { 
                        path: '', 
                        component: CmpIssueListComponent,
                        resolve: {
                            issues: CmpIssueService
                        }
                    }, 
                    {
                        path: 'new',
                        component: NewIssueComponent
                    },
                    {
                        path: ':id',
                        component: IssueDetailComponent
                    }
                ]
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