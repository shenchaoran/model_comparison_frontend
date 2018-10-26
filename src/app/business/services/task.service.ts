import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService extends ListBaseService {
    protected baseUrl = '/comparison/tasks';

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
    ) { 
        super(http);
    }

    create() {
        this.userService.redirectIfNotLogined();
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
}
