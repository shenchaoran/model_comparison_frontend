import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@common/core/services/http.client';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';
import { ConversationService } from './conversation.service';
import { Issue } from '../models/issue.class';
import { Conversation, Comment } from '../models/conversation.class';

var counter = 1;
@Injectable({
    providedIn: 'root'
})
export class IssueService extends ListBaseService {
    protected baseUrl = '/comparison/issues';
    public issue: Issue;
    public conversation: Conversation;

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
        private conversationService: ConversationService
    ) {
        super(http);
        console.log('\n******** IssueService constructor ', counter++);
    }

    createIssue() {
        this.issue = new Issue(this.userService.user);
        return this.issue;
    }

    createConversation() {
        this.conversation = this.conversationService.createConversation();
        return this.conversation;
    }
}