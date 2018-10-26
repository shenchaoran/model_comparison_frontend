import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ConversationModule } from '../conversation';
import { MatSharedModule } from '../../mat-shared';
import { SimplemdeModule } from 'ng2-simplemde';

import { TopicRoutingModule } from './index-routing.module';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';

const modules = [
    SharedModule,
    ConversationModule,
    TopicRoutingModule,
    MatSharedModule,
    SimplemdeModule.forRoot()
];
const components = [
    TopicDetailComponent,
    TopicListComponent,
    CreateTopicComponent,
];
const services = [];
const pipes = [];
const directives = [];

/**************************************************************/
/**************************************************************/

@NgModule({
    imports: [...modules],
    declarations: [
        ...components,
        ...pipes,
        ...directives
    ],
    providers: [...services]
})
export class TopicModule { }
