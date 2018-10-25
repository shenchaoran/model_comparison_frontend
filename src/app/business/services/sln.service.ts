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

    public findOne(id, withRequestProgress?) {
        this.clear();

        return super.findOne(id, withRequestProgress).pipe(map(res => {
            if(!res.error) {
                this.solution = res.data.solution;
                this.topic = res.data.topic;
                this.tasks = res.data.tasks;
                this.mss = res.data.mss;
                
                this.conversationService.init(
                    res.data.conversation,
                    res.data.users,
                    res.data.commentCount,
                    this.topic.auth.userId,
                    this.topic._id
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
