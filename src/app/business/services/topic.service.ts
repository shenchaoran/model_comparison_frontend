import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';
import { SolutionService } from './sln.service';
import { ConversationService } from './conversation.service';
import { Topic, Solution, Conversation, Comment, User } from '../models';

var counter = 1;
@Injectable({
    providedIn: 'root'
})
export class TopicService extends ListBaseService {
    public user_topics: Topic[];
    public get conversation(): Conversation { return this.conversationService.conversation; }
    public get user(): User { return this.userService.user; }

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
        private conversationService: ConversationService,
    ) {
        super(http);
        this.baseUrl = `${this.http.api.backend}/comparison/topics`;
        console.log('******** TopicService constructor ', counter++);
    }

    public create() {
        let topic = new Topic(this.user);
        let cid = this.conversationService.create(topic._id)._id;
        topic.cid = cid;
        return topic;
    }

    public findByUserId(userId) {
        return super.findAll({ userId }).pipe(map(res => {
            if(!res.error) {
                this.user_topics = res.data.docs;
            }
            return res;
        }));
    }

    /**
     * 订阅/取消订阅
     */
    public subscribeToggle(topicId, ac, uid) {
        return super.patch(`${topicId}`, { ac, uid });
    }
}