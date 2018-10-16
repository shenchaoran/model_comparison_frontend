import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    public get conversation(): Conversation {
        return this.conversationService.conversation
    }

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
        private conversationService: ConversationService
    ) {
        super(http);
        console.log('\n******** IssueService constructor ', counter++);
    }

    public findOne(id, withRequestProgress?) {
        return super.findOne(id, withRequestProgress)
            .pipe(
                map(res => {
                    if(!res.error){
                        this.issue = res.data.issue;
                        // this.conversation = res.data.conversation;
                    }
                })
            )
    }

    public createIssue() {
        this.issue = new Issue(this.userService.user);
        this.issue.cid = this.conversationService.createConversation(this.issue._id)._id;
        return this.issue;
    }
}