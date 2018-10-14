import { Injectable } from '@angular/core';
import { ListBaseService } from './list-base.service';
import { _HttpClient } from '@core';

@Injectable({
    providedIn: 'root'
})
export class ConversationService extends ListBaseService {
    protected baseUrl = 'conversations';

    constructor(
        protected http: _HttpClient
    ) {
        super(http);
    }
}
