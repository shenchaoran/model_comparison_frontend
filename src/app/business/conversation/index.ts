import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MatSharedModule } from '../../common/mat-shared';
// import { NgxEditorModule } from 'ngx-editor';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';

import { ConversationComponent } from './conversation/conversation.component';
import { CommentComponent } from './comment/comment.component';

const modules = [
    SharedModule,
    MatSharedModule,
    // NgxEditorModule,
    SimplemdeModule.forRoot(),
];
const components = [
    ConversationComponent,
    CommentComponent
];
const services = [
    // {
    //     provide: SIMPLEMDE_CONFIG,
    //     useValue: {}
    // }
];
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
