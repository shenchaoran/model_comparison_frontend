import { NgModule } from '@angular/core';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';
import { 
    HeaderMenuLayoutModule,
    NgxSharedModule,
} from '@shared';
import { 
    MatProgressSpinnerModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,

} from '@angular/material';

import { ConversationComponent } from './conversation/conversation.component';
import { CommentComponent } from './comment/comment.component';

const modules = [
    NgxSharedModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    SimplemdeModule.forRoot(),
    HeaderMenuLayoutModule,
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
