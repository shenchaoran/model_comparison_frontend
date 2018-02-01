import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpIssueListComponent } from './cmp-issue-list/cmp-issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { CmpIssueListRoutingModule } from './routing.module';
import { SharedModule } from '@shared';

@NgModule({
    imports: [SharedModule, CmpIssueListRoutingModule],
    declarations: [CmpIssueListComponent, IssueDetailComponent]
})
export class CmpIssueModule {}
