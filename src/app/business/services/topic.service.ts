import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@common/core/services/http.client';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';
import { ConversationService } from './conversation.service';
import { Topic } from '../models/topic.class';
import { Conversation, Comment } from '../models/conversation.class';

var counter = 1;
@Injectable({
    providedIn: 'root'
})
export class TopicService extends ListBaseService {
    protected baseUrl = '/comparison/topics';
    public topic: Topic;
    public topicList: Topic[];
    public topicCount: Number;
    public hadSaved: boolean;
    public currentUser_topicList: Topic[];
    public currentUser_topicCount: Number;
    public get conversation(): Conversation {
        return this.conversationService.conversation;
    }

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
        private conversationService: ConversationService
    ) {
        super(http);
        console.log('\n******** TopicService constructor ', counter++);
        this.clear();
    }

    public createTopic() {
        this.clear();
        this.topic = new Topic(this.userService.user);
        let cid = this.conversationService.createConversation(this.topic._id)._id;
        this.topic.cid = cid;
        this.hadSaved = false;
        return this.topic;
    }

    public findOne(id, withRequestProgress?) {
        this.clear();

        return super.findOne(id, withRequestProgress)
            .pipe(
                map(res => {
                    if (!res.error) {
                        this.topic = res.data.topic;
                        this.hadSaved = true;
                        this.conversationService.users = res.data.users;
                        this.conversationService.authorId = this.topic.auth.userId;
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
            if (!res.error) {
                this.topicList = res.data.docs;
                this.topicCount = res.data.count;
            }
            return res;
        }));
    }

    public findByUserId(userId) {
        return this.http.get(`${this.baseUrl}`, {
            params: {
                pageIndex: 1,
                pageSize: 50,
                userId: userId,
            }
        }).pipe(map(res => {
            if (!res.error) {
                this.currentUser_topicList = res.data.docs;
                this.currentUser_topicCount = res.data.count;
            }
            return res;
        }));
    }

    public upsertTopic() {
        let fn = this.hadSaved ?
            () => this.http.patch(`${this.baseUrl}/${this.topic._id}`, { topic: this.topic }) :
            () => this.http.post(`${this.baseUrl}`, {
                topic: this.topic,
                conversation: this.conversation
            });

        return fn().pipe(
            map(res => {
                if (!res.error) { }
                return res;
            })
        );
    }

    public deleteTopic() {
        return this.http.delete(`${this.baseUrl}/${this.topic._id}`).pipe(map(res => {
            if (!res.error) {

            }
            return res;
        }))
    }

    public clear() {
        this.conversationService.clear();
        this.topic = null;
        this.topicCount = 0;
        this.topicList = [];
        this.hadSaved = null;
        this.currentUser_topicList = null;
        this.currentUser_topicCount = 0;
    }
}