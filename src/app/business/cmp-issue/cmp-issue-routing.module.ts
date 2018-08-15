import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmpIssueListComponent } from './cmp-issue-list/cmp-issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { HeaderMenuLayoutComponent } from '@common/shared';
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
                        },
                        data: {
                            title: 'Comparison Issues'
                        }
                    }, 
                    {
                        path: 'new',
                        component: NewIssueComponent,
                        data: {
                            title: 'Create a New Issue'
                        }
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