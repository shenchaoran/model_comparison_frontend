import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@common/core/services/http.client';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';
import { Issue } from '../models/issue.class';
import { Conversation, Comment } from '../models/conversation.class';

@Injectable({
    providedIn: 'root'
})
export class IssueService extends ListBaseService {
    protected baseUrl = '/comparison/issues';
    public issue: Issue;

    constructor(
        protected http: _HttpClient,
        private userService: UserService,

    ) {
        super(http);
    }

    create() {

    }
}