import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ConversationModule } from '../conversation';
import { MatSharedModule } from '../../common/mat-shared';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';

import { TopicRoutingModule } from './index-routing.module';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';

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
