import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {
    UserService,
    ConversationService,
} from '@services';

import { ConversationComponent } from './conversation/conversation.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        ConversationComponent,
        CommentComponent
    ],
    providers: [
        UserService,
        ConversationService,
    ],
    exports: [
        ConversationComponent
    ]
})
export class ConversationModule { }
