import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    ConversationService,
    IssueService,
    UserService,
} from '@services';
import {
    Issue,
    Conversation,
    Comment,
    CommentType,
} from '@models';

@Component({
    selector: 'ogms-create-issue',
    templateUrl: './create-issue.component.html',
    styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit, OnDestroy {
    issue: Issue;
    conversation: Conversation;

    constructor(
        private issueService: IssueService,
        private conversationService: ConversationService,
        private userService: UserService,
    ) {
        this.userService.redirectIfNotLogined();
    }

    ngOnInit() {
        this.issue = this.issueService.createIssue();
        this.conversation = this.conversationService.conversation;
    }

    ngOnDestroy() {
        this.conversationService.clear();
    }
}
