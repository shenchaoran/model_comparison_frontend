import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpIssueListComponent } from './cmp-issue-list/cmp-issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { CmpIssueListRoutingModule } from './routing.module';
import { SharedModule } from '@shared';
import { VisualizationModule } from "../visualization/visualization.module";

import { MockService } from "../mock/mock.service";

@NgModule({
    imports: [SharedModule, CmpIssueListRoutingModule, VisualizationModule],
    declarations: [CmpIssueListComponent, IssueDetailComponent],
    providers: [
        MockService
    ]
})
export class CmpIssueModule {}
