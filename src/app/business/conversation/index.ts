import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { ConversationComponent } from './conversation/conversation.component';
import { CommentComponent } from './comment/comment.component';

const modules = [
    SharedModule,
];
const components = [
    ConversationComponent,
    CommentComponent
];
const services = [];
var exportComponents = [
    ConversationComponent
];

@NgModule({
    imports: [...modules],
    declarations: [...components],
    providers: [...services],
    exports: [...exportComponents]
})
export class ConversationModule { }
