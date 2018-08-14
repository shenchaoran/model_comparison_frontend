import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpIssueListComponent } from './cmp-issue-list/cmp-issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { CmpIssueListRoutingModule } from './cmp-issue-routing.module';
import { SharedModule } from '@shared';
import { NewIssueComponent } from './new-issue/new-issue.component';
import { CmpIssueService } from './services';
import { CmpIssueComponent } from './cmp-issue.component';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

@NgModule({
    imports: [SharedModule, CmpIssueListRoutingModule],
    declarations: [CmpIssueListComponent, IssueDetailComponent, NewIssueComponent, CmpIssueComponent],
    providers: [
        CmpIssueService,
        NzNotificationService
    ]
})
export class CmpIssueModule { }
