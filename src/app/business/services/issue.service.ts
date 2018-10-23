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
    public issueList: Issue[];
    public issueCount: Number;
    public get conversation(): Conversation {
        return this.conversationService.conversation;
    }

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
        private conversationService: ConversationService
    ) {
        super(http);
        console.log('\n******** IssueService constructor ', counter++);
    }

    public createIssue() {
        this.issue = new Issue(this.userService.user);
        let cid = this.conversationService.createConversation(this.issue._id)._id;
        this.issue.cid = cid;
        return this.issue;
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

    public findAll() {
        return this.http.get(`${this.baseUrl}`, {
            pageIndex: 1,
            pageSize: 50
        }).pipe(map(res => {
            if(!res.error) {
                this.issueList = res.data.docs;
                this.issueCount = res.data.count;
            }
            return res;
        }));
    }

    public postIssue() {
        return this.http.post(`${this.baseUrl}`, {
            issue: this.issue,
            conversation: this.conversation
        })
        .pipe(
            map(res => {
                if(!res.error) {}
                return res;
            })
        );
    }

    public patchIssue() {
        return this.http.patch(`${this.baseUrl}/${this.issue._id}`, this.issue).pipe(map(res => {
            if(!res.error) {

            }
            return res;
        }))
    }

    public deleteIssue() {
        return this.http.delete(`${this.baseUrl}/${this.issue._id}`).pipe(map(res => {
            if(!res.error) {

            }
            return res;
        }))
    }

    public clear() {
        this.conversationService.clear();
        this.issue = null;
        this.issueCount = 0;
        this.issueList = null;
    }
}