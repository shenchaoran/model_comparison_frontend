import { Component, OnInit, Input } from "@angular/core";

import { Issue } from "../../../../business/mock/issue.model";

@Component({
    selector: 'issue-card',
    templateUrl: './issueCard.component.html',
    styleUrls: ['./issueCard.component.scss']
})

export class IssueCardComponent implements OnInit {
    @Input() issue: Issue;
    constructor() {}
    ngOnInit() {

    }
}