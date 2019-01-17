import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { ConversationService } from './conversation.service';
import { Task, Solution, Topic, MS, Conversation, Comment, User,  } from '../@models';

var counter = 1;
@Injectable({
    providedIn: 'root'
})
export class TaskService extends ListBaseService {
    public task: Task;
    public taskList: Task[];
    public taskCount: number;
    public hadSaved: boolean;

    public get conversation(): Conversation { return this.conversationService.conversation; }
    public get user(): User { return this.userService.user; }

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
        private conversationService: ConversationService,
    ) { 
        super(http);
        this.baseUrl = `${this.http.api.backend}/comparison/tasks`;
        console.log('******** TopicService constructor ', counter++);
    }

    public create() {
        let task = new Task(this.user);
        let cid = this.conversationService.create(task._id, 'task')._id;
        task.cid = cid;
        return task;
    }

    invoke(id: string): Observable<any> {
        if (id) {
            return this.http.post(`${this.baseUrl}/${id}/invoke`, undefined);
        } else {
            return undefined;
        }
    }

    public startOneCmpMethod(taskId, metricName, methodName, message): Observable<any> {
        return this.http.post(`${this.baseUrl}/${taskId}/cmpMethod`, {
            metricName,
            methodName,
            message,
        })
    }

    public findByUserId(userId) {
        this.clear();
        return this.http.get(`${this.baseUrl}`, {
            params: {
                userId: userId,
            }
        }).pipe(map(res => {
            if (!res.error) {
                this.taskList = res.data.docs;
            }
            return res;
        }));
    }

    public clear() {
        this.taskList = [];
    }

    public getSTDResult(index, metricName, slnId) {
        return this.http.get(`${this.http.api.backend}/std-result/${index}/${slnId}/${metricName}/state`)
    }
}
