import { NgModule } from '@angular/core';
import { ConversationModule } from '../conversation';
import { SimplemdeModule } from 'ng2-simplemde';
import { 
    NgxSharedModule,
    HeaderMenuLayoutModule,
    DetailLayoutModule,
    CustomTemplateModule,
    CreateDocModule,
    DirectivesModule,
    PipesModule,
 } from '@shared';
import {
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
} from '@angular/material';
import { TopicRoutingModule } from './index-routing.module';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';

const modules = [
    NgxSharedModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    ConversationModule,
    TopicRoutingModule,
    SimplemdeModule.forRoot(),
    HeaderMenuLayoutModule,
    DetailLayoutModule,
    CustomTemplateModule,
    DetailLayoutModule,
    CreateDocModule,
    DirectivesModule,
    PipesModule,
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
