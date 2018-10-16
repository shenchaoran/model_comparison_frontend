import { Component, OnInit } from '@angular/core';
import {
    IssueService,
    ConversationService
} from '../../services';

@Component({
    selector: 'ogms-issue-detail',
    templateUrl: './issue-detail.component.html',
    styleUrls: ['./issue-detail.component.scss'],
    providers: [
        // ConversationService
    ]
})
export class IssueDetailComponent implements OnInit {

    constructor(
        private issueService: IssueService,
        private conversationService: ConversationService,
    ) { }

    ngOnInit() {
    }

}
