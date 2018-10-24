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
} from '../models';

var counter = 1;
@Injectable({
    providedIn: 'root'
})
export class SlnService extends ListBaseService {
    protected baseUrl = '/comparison/solutions';
    
    public solution: Solution;
    public solutionList: Solution[];
    public solutionCount: number;
    public hadSaved: boolean;

    constructor(
        protected http: _HttpClient,
        private conversationService: ConversationService,
        private taskService: TaskService,
        private userService: UserService,
        private msrService: MSRService,
    ) { 
        super(http);
        console.log('\n******** SlnService constructor ', counter++);
        this.clear();
    }

    public findOne(id, withRequestProgress?) {
        this.clear();
        return super.findOne(id, withRequestProgress).pipe(map(res => {
            return res;
        }));
    }

    // public findAll() {

    // }

    public clear() {
        this.conversationService.clear();
        this.solution = null;
        this.solutionList = [];
        this.solutionCount = 0;
        this.hadSaved = null;
    }
}
