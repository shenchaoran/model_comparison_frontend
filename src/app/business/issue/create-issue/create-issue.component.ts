import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Route } from '@angular/router';
import { 
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import {
    ConversationService,
    IssueService,
    UserService,
} from '@services';
import {
    Issue,
    Conversation,
    Comment,
    CommentType,
} from '@models';
import { DefaultLifeHook } from '../../../common/shared/classes';

@Component({
    selector: 'ogms-create-issue',
    templateUrl: './create-issue.component.html',
    styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent extends DefaultLifeHook implements OnInit {
    issue: Issue;
    conversation: Conversation;
    issueFG: FormGroup;
    mdeOpt = {
        placeholder: 'Issue description...'
    }

    constructor(
        private issueService: IssueService,
        private conversationService: ConversationService,
        private userService: UserService,
        private fb: FormBuilder,
        private router: Router,
    ) {
        super(issueService);
        this.userService.redirectIfNotLogined();
        this.issueFG = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(6)]],
            desc: ['', [Validators.required, Validators.minLength(6)]],
        });
        this.issue = this.issueService.createIssue();
        this.conversation = this.conversationService.conversation;
    }

    ngOnInit() {}

    onSubmit() {
        this.issue.meta.name = this.issueFG.value.name;
        this.issue.meta.desc = this.issueFG.value.desc;
        let _id = this.issue._id;
        this.issueService.postIssue().subscribe(res => {
            if(!res.error) {
                this.router.navigate(['/issues', _id]);
            }
        });
    }
}
