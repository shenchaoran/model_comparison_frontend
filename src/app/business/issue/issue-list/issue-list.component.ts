import { Component, OnInit } from '@angular/core';
import {
    IssueService,
    ConversationService
} from '../../services';
import {
    Issue,
} from '../../models';
import { DefaultLifeHook } from '../../../common/shared/classes';

@Component({
    selector: 'ogms-issue-list',
    templateUrl: './issue-list.component.html',
    styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent extends DefaultLifeHook implements OnInit {
    get issueList(): Issue[] {
        return this.issueService.issueList;
    }
    get issueCount(): Number {
        return this.issueService.issueCount;
    }

    constructor(
        public issueService: IssueService
    ) {
        super(issueService);
    }

    ngOnInit() {
        this.issueService.findAll().subscribe(res => {})
    }

    onPageChange(e) {
        this.issueService.findAll();
    }
}
