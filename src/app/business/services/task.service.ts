import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';
import { OgmsService } from './service.interface';
import { ConversationService } from './conversation.service';
import { Task, Solution, Topic, MS, Conversation, Comment, User,  } from '../models';

var counter = 1;
@Injectable({
    providedIn: 'root'
})
export class TaskService extends ListBaseService implements OgmsService {
    protected baseUrl = '/comparison/tasks';

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
        console.log('******** TopicService constructor ', counter++);
        this.clear();
    }

    public import(task: Task, taskList: Task[], taskCount: number) {
        this.clear();

        this.hadSaved = true;
        this.task = task;
        this.taskList = taskList;
        this.taskCount = taskCount;
    }

    public create() {
        this.userService.redirectIfNotLogined();
        this.clear();

        this.task = new Task(this.user);
        let cid = this.conversationService.create(this.task._id)._id;
        this.task.cid = cid;
        this.hadSaved = false;
        return this.task;
    }

    invoke(id: string): Observable<any> {
        if (id) {
            return this.http.post(`${this.baseUrl}/${id}/invoke`, undefined);
        } else {
            return undefined;
        }
    }

    insert(obj: {
        task: any,
        calcuTasks: any[]
    }): Observable<any> {
        return this.http.post(`${this.baseUrl}`, obj);
    }

    public clear() {
        this.task = null;
        this.taskList = [];
        this.taskCount = null;
        this.hadSaved = null;
    }
}
