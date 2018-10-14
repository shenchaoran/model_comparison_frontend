import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { fromJS } from 'immutable';
import { Conversation } from '@models';
import {
    ConversationService,
    UserService
} from '../../services';

@Component({
    selector: 'ogms-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent implements OnInit {
    conversation: Conversation;
    _loading: boolean = true;
    @Input() set _id(v: string) {
        this.service.findOne(v)
            .subscribe(res => {
                this._loading = false;
                if(res.error) {

                }
                else {
                    this.conversation = res.data;
                }
            });
    }

    constructor(
        private service: ConversationService,
        private userService: UserService
    ) { }

    ngOnInit() {
    }

}
