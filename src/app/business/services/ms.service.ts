import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';
import { SolutionService } from './sln.service';
import { ConversationService } from './conversation.service';
import { Topic, Solution, Conversation, Comment, User, MS } from '../models';

@Injectable({
    providedIn: 'root'
})
export class MSService extends ListBaseService {
    protected baseUrl = '/model-service';
    public get conversation() { return this.conversationService.conversation; }

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
        private conversationService: ConversationService,
    ) { 
        super(http);
    }

    invoke(msInstance): Observable<any> {
        return this.http.post(`/model-service/invoke`, { msInstance });
    }

    getLog(msrId) {
        return this.http.get(`/calculation/log/${msrId}`)
    }
}
