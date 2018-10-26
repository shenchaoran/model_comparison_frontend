import { SolutionService } from './sln.service';
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
import { Solution } from '../models/solution.class';
import { Conversation, Comment } from '../models/conversation.class';
import { User } from '../models/user.class';
import { OgmsService } from './service.interface';

var counter = 1;
@Injectable({
    providedIn: 'root'
})
export class TopicService extends ListBaseService implements OgmsService {
    protected baseUrl = '/comparison/topics';

    public topic: Topic;
    public topicList: Topic[];
    public topicCount: number;
    public hadSaved: boolean;

    public get conversation(): Conversation { return this.conversationService.conversation; }
    public get user(): User { return this.userService.user; }

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
        private conversationService: ConversationService,
        private solutionService: SolutionService,
    ) {
        super(http);
        console.log('******** TopicService constructor ', counter++);
        this.clear();
    }

    

    public create() {
        this.userService.redirectIfNotLogined();
        this.clear();

        this.topic = new Topic(this.user);
        let cid = this.conversationService.create(this.topic._id)._id;
        this.topic.cid = cid;
        this.hadSaved = false;
        return this.topic;
    }

    public findOne(id) {
        this.clear();

        return this.http.get(`${this.baseUrl}/${id}`).pipe(map(res => {
            if (!res.error) {
                this.topic = res.data.topic;
                this.hadSaved = true;

                this.solutionService.solutionList = res.data.solutions;
                this.solutionService.solutionCount = res.data.solutionCount;

                this.conversationService.import(
                    res.data.conversation,
                    res.data.users,
                    res.data.commentCount,
                    this.topic.auth.userId,
                    this.topic._id,
                );
            }
            return res;
        }));
    }

    public findAll() {
        this.clear();

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
        this.clear();
        return this.http.get(`${this.baseUrl}`, {
            params: {
                userId: userId,
            }
        }).pipe(map(res => {
            if (!res.error) {
                this.topicList = res.data.docs;
                console.log(this.topicList[0]);
            }
            return res;
        }));
    }
    // public patchTopic(obj: {[key: string]: any}) {
    //     return this.http.patch(`${this.baseUrl}/${this.topic._id}`, obj).pipe(map(res => {
    //         if (!res.error) { }
    //         return res;
    //     }));
    // }

    // public postTopic() {
    //     return this.http.post(`${this.baseUrl}`, {
    //         topic: this.topic,
    //         conversation: this.conversation
    //     }).pipe(map(res => {
    //         if (!res.error) { }
    //         return res;
    //     }));
    // }

    public upsert() {
        let fn = this.hadSaved ?
            () => this.http.patch(`${this.baseUrl}/${this.topic._id}`, { topic: this.topic }) :
            () => this.http.post(`${this.baseUrl}`, {
                topic: this.topic,
                conversation: this.conversation
            });

        return fn().pipe(map(res => {
            if (!res.error) { }
            return res;
        }));
    }

    public delete() {
        return this.http.delete(`${this.baseUrl}/${this.topic._id}`).pipe(map(res => {
            if (!res.error) {

            }
            return res;
        }))
    }

    /**
     * 关联/取消关联方案
     */
    public changeIncludeSln(sln) {
        let isRemove = sln.topicId === this.topic._id;
        return this.http.patch(`${this.baseUrl}/${this.topic._id}/solution`, {
            ac: isRemove ? 'remove' : 'add',
            solutionId: sln._id
        }).pipe(map(res => {
            if (!res.error) {
                if (isRemove) {
                    sln.topicId = null;
                    let i = this.topic.solutionIds.indexOf(sln._id);
                    if (i !== -1) {
                        this.topic.solutionIds.splice(i, 1);
                    }
                }
                else {
                    sln.topicId = this.topic._id;
                    let i = this.topic.solutionIds.indexOf(sln._id);
                    if (i === -1) {
                        this.topic.solutionIds.push(sln._id);
                    }
                }
            }
            return res;
        }));
    }

    /**
     * 订阅/取消订阅
     */
    public subscribeToggle(ac, uid) {
        return this.http.patch(`${this.baseUrl}/${this.topic._id}`, {
            ac: ac,
            uid: uid
        }).pipe(map(res => {
            if (!res.error) {
                let i = this.topic.subscribed_uids.findIndex(v => v === this.user._id);
                if (ac === 'subscribe') {
                    if (i === -1) {
                        this.topic.subscribed_uids.push(this.user._id);
                    }
                }
                else if (ac === 'unsubscribe') {
                    this.topic.subscribed_uids.splice(i, 1);
                }
            }
            return res;
        }));
    }

    public clear() {
        this.conversationService.clear();
        this.topic = null;
        this.topicCount = 0;
        this.topicList = [];
        this.hadSaved = null;
    }
}