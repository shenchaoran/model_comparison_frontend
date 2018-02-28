import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpIssueListComponent } from './cmp-issue-list/cmp-issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { CmpIssueListRoutingModule } from './cmp-issue-routing.module';
import { SharedModule } from '@shared';
import { NewIssueComponent } from './new-issue/new-issue.component';
import { CmpIssueService } from './services';
import { CmpIssueComponent } from './cmp-issue.component';
import { OlMapModule } from '@feature/ol-map/ol-map.module';

@NgModule({
    imports: [SharedModule, OlMapModule, CmpIssueListRoutingModule],
    declarations: [CmpIssueListComponent, IssueDetailComponent, NewIssueComponent, CmpIssueComponent],
    providers: [
        CmpIssueService
    ]
})
export class CmpIssueModule { }