import { Component, OnInit } from '@angular/core';
import {
    IssueService,
    ConversationService
} from '../../services';

@Component({
    selector: 'ogms-issue-list',
    templateUrl: './issue-list.component.html',
    styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

    constructor(
        private issueService: IssueService
    ) { }

    ngOnInit() {
    }

}
