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
} from '../@models';

var counter = 1;
@Injectable({
    providedIn: 'root'
})
export class SolutionService extends ListBaseService {
    public user_solutions: Solution[];
    private _validTemporalOptions: {label: string; value: number}[];
    public get validTemporalOptions() {return this._validTemporalOptions}

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
        let cid = this.conversationService.create(solution._id, 'solution')._id;
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

    public updatePts(solutionId, ids) {
        return super.patch(`${solutionId}`, {
            ac: 'updatePts',
            ids
        })
    }

    public createTask(solutionId) {
        return this.http.get(`${this.baseUrl}/${solutionId}`, {
            params: {
                ac: 'createTask',
            }
        })
    }

    public setValidTemporalOptions(msNames, obsNames) {
        let validIntervals = [
            {
                label: '1 day',
                value: 1,
            },
            {
                label: '8 day',
                value: 8,
            },
            {
                label: '1 month',
                value: 30,
            },
            {
                label: '1 season',
                value: 90
            },
            {
                label: '1 year',
                value: 365,
            },
        ]
        let timeMap = {
            'IBIS site': 1,
            'Biome-BGC site': 1,
            'LPJ': 1,
            'MODIS MOD 17 A2': 8,
            'MODIS MOD 17 A3': 365,
            'Fluxdata': 1,
        }
        let maxTimeInterval = 0;
        for(let key of msNames.concat(obsNames)) {
            if(timeMap[key] >  maxTimeInterval)
                maxTimeInterval = timeMap[key]
        }
        for(let i=0; i< validIntervals.length; i++) {
            if(validIntervals[i].value < maxTimeInterval) {
                validIntervals.splice(i, 1)
                i--
            }
        }
        this._validTemporalOptions = validIntervals;
    }
}
