import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpIssueListComponent } from './cmp-issue-list/cmp-issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { CmpIssueListRoutingModule } from './routing.module';
import { SharedModule } from '@shared';
import { NewIssueComponent } from './new-issue/new-issue.component';
import { CmpIssueService } from './services';

@NgModule({
    imports: [SharedModule, CmpIssueListRoutingModule],
    declarations: [CmpIssueListComponent, IssueDetailComponent, NewIssueComponent],
    providers: [
        CmpIssueService
    ]
})
export class CmpIssueModule {}
