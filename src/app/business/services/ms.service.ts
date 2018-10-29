import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';
import { SolutionService } from './sln.service';
import { ConversationService } from './conversation.service';
import { Topic, Solution, Conversation, Comment, User, MS } from '../models';
import { OgmsService } from './service.interface';

@Injectable({
    providedIn: 'root'
})
export class MSService extends ListBaseService implements OgmsService {
    protected baseUrl = '/model-service';

    public mss: MS[];
    public msCount: number;
    public ms: MS;
    
    constructor(
        protected http: _HttpClient,
        private userService: UserService,
        private conversationService: ConversationService,
    ) { 
        super(http);
    }

    public import(ms: MS, mss: MS[], msCount: number,) {
        this.clear();
        this.ms = ms;
        this.mss = mss;
        this.msCount = msCount;
    }

    invoke(obj): Observable<any> {
        return this.http.post(`/model-service/invoke`, {
            msInstance: obj
        });
    }

    getLog(msrId) {
        return this.http.get(`/calculation/log/${msrId}`)
    }

    findAll(query?) {
        this.clear();

        return super.findAll(query).pipe(map(res => {
            if(!res.error) {
                this.mss = res.data.docs;
                this.msCount = res.data.count;
            }
            return res;
        }))
    }

    public clear() {
        this.mss = [];
        this.msCount = null;
        this.ms = null;
    }
}
