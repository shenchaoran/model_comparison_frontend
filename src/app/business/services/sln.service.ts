import { ConversationService } from './conversation.service';
import { MSRService } from './msr.service';
import { UserService } from '@services/user.service';
import { TaskService } from './task.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '../../common/core/services';
import { ListBaseService } from './list-base.service';
import { map } from 'rxjs/operators';
import { 
    Solution,
    Topic,
    Task,
    CalcuTask,
    Conversation,
    Comment,
    MS,
    User,
} from '../models';

var counter = 1;
@Injectable({
    providedIn: 'root'
})
export class SolutionService extends ListBaseService {
    protected baseUrl = '/comparison/solutions';
    
    public solution: Solution;
    public topic: Topic;                        // siderbar-summary
    public tasks: Task[];                       // siderbar-summary
    public mss: MS[];                 // siderbar-summary
    public solutionList: Solution[];
    public solutionCount: number;
    public hadSaved: boolean;

    public get user(): User { return this.userService.user; }
    public get conversation(): Conversation {return this.conversationService.conversation;}

    constructor(
        protected http: _HttpClient,
        private conversationService: ConversationService,
        private taskService: TaskService,
        private userService: UserService,
        private msrService: MSRService,
    ) { 
        super(http);
        console.log('******** SolutionService constructor ', counter++);
        this.clear();
    }

    public initList(solutionList: Solution[], solutionCount: number) {
        this.solutionList = solutionList;
        this.solutionCount = solutionCount;
    }

    public create() {
        this.clear();
        this.solution = new Solution(this.user);
        let cid = this.conversationService.createConversation(this.solution._id)._id;
        this.solution.cid = cid;
        this.hadSaved = false;
        return this.solution;
    }

    public findOne(id, withRequestProgress?) {
        this.clear();

        return super.findOne(id, withRequestProgress).pipe(map(res => {
            if(!res.error) {
                this.solution = res.data.solution;
                this.topic = res.data.topic;
                this.tasks = res.data.tasks;
                this.mss = res.data.mss;
                this.hadSaved = true;
                
                this.conversationService.init(
                    res.data.conversation,
                    res.data.users,
                    res.data.commentCount,
                    this.solution.auth.userId,
                    this.solution._id
                );
            }
            return res;
        }));
    }

    public findAll(query?) {
        this.clear();

        return super.findAll(query).pipe(map(res => {
            if(!res.error) {
                this.solutionList = res.data.docs;
                this.solutionCount = res.data.count;
            }
            return res;
        }));
    }

    public upsert() {
        let fn = this.hadSaved ?
            () => this.http.patch(`${this.baseUrl}/${this.solution._id}`, { solution: this.solution }) :
            () => this.http.post(`${this.baseUrl}`, {
                solution: this.solution,
                conversation: this.conversation
            });

        return fn().pipe(map(res => {
            if (!res.error) { }
            return res;
        }));
    }

    public insert() {
        return this.http.post(`${this.baseUrl}`, {
            solution: this.solution,
            conversation: this.conversation
        }).pipe(map(res => {
            if(!res.error) {

            }
            return res;
        }));
    }

    public subscribeToggle(ac, uid) {
        return this.http.patch(`${this.baseUrl}/${this.solution._id}`, {
            ac: ac,
            uid: uid
        }).pipe(map(res => {
            if(!res.error) {
                let i = this.solution.subscribed_uids.findIndex(v => v === this.user._id);
                if(ac === 'subscribe') {
                    if(i === -1) {
                        this.solution.subscribed_uids.push(this.user._id);
                    }
                }
                else if(ac === 'unsubscribe') {
                    this.solution.subscribed_uids.splice(i, 1);
                }
            }
            return res;
        }));
    }

    public clear() {
        // this.conversationService.clear();
        this.solution = null;
        this.solutionList = [];
        this.solutionCount = 0;
        this.topic = null;
        this.tasks = null;
        this.mss = null;
        this.hadSaved = null;
    }
}
