import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ConversationModule } from '../conversation';

import { IssueRoutingModule } from './index-routing.module';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';

import { 
    ConversationService,
} from '../services';

let imports = [
    SharedModule,
    ConversationModule,
    IssueRoutingModule
];
let components = [
    IssueDetailComponent,
    IssueListComponent,
];
let services = [
    ConversationService,
];
let pipes = [

];
let directives = [];

/**************************************************************/
/**************************************************************/

@NgModule({
    imports: [...imports],
    declarations: [
        ...components,
        ...pipes,
        ...directives
    ],
    providers: [...services]
})
export class IssueModule { }
