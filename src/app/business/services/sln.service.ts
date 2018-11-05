import { ConversationService } from './conversation.service';
import { MSRService } from './msr.service';
import { UserService } from './user.service';
import { TaskService } from './task.service';
import { Injectable } from '@angular/core';
import { _HttpClient } from '../../core/services';
import { ListBaseService } from './list-base.service';
// import { TopicService } from './topic.service';
import { map } from 'rxjs/operators';
import { MSService } from './ms.service';
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
    public user_solutions: Solution[];

    public get user(): User { return this.userService.user; }
    public get conversation(): Conversation {return this.conversationService.conversation;}

    constructor(
        protected http: _HttpClient,
        private conversationService: ConversationService,
        private userService: UserService,
    ) { 
        super(http);
        this.baseUrl = `${this.http.api.backend}/comparison/solutions`;
        console.log('******** SolutionService constructor ', counter++);
    }

    public create() {
        let solution = new Solution(this.user);
        let cid = this.conversationService.create(solution._id)._id;
        solution.cid = cid;
        return solution;
    }

    public findByUserId(userId) {
        return super.findAll({ userId }).pipe(map(res => {
            if(!res.error) {
                this.user_solutions = res.data.docs;
            }
        }));
    }

    public subscribeToggle(slnId, ac, uid) {
        return super.patch(`${slnId}`, { ac, uid });
    }

    public updatePts(solutionId, ids) {
        return super.patch(`${solutionId}`, {
            ac: 'updatePts',
            ids
        })
    }
}
