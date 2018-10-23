import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Route, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import {
    IssueService,
    ConversationService,
    UserService
} from '../../services';
import {
    Issue,
    Conversation,
    Comment,
} from '../../models';
import { DefaultLifeHook } from '../../../common/shared/classes/default-life-hook.class';
import { Simplemde } from 'ng2-simplemde';

@Component({
    selector: 'ogms-issue-detail',
    templateUrl: './issue-detail.component.html',
    styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent extends DefaultLifeHook implements OnInit {
    mode: 'READ' | 'WRITE';
    issueFG: FormGroup;
    mdeOption = { placeholder: 'Issue description...'};
    conversationLoading: boolean = true;
    issueLoading: boolean = true;
    @ViewChild(Simplemde) simpleMDE: any;

    get couldEdit(): boolean {
        return this.user && this.issue && this.issue.auth.userId === this.user._id;
    }

    get user() {
        return this.userService.user;
    }

    get issue(): Issue {
        return this.issueService.issue;
    }

    get conversation(): Conversation {
        return this.conversationService.conversation;
    }

    constructor(
        private issueService: IssueService,
        private conversationService: ConversationService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) {
        super(issueService);
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const issueId = params['id'];
            if(issueId === 'create') {
                this.userService.redirectIfNotLogined();
                this.issueService.createIssue();
                this.mode = 'WRITE';
                this.issueFG = this.fb.group({
                    name: ['', [Validators.required, Validators.minLength(3)]],
                    descMD: ['', [Validators.required, Validators.minLength(6)]],
                });
                this.conversationLoading = false;

            }
            else {
                this.mode = 'READ';
                this.issueService.findOne(issueId).subscribe(res => {
                    this.issueLoading = false;
                });
            }
        });
    }

    onSubmit() {
        this.issue.meta.name = this.issueFG.value.name;
        this.issue.meta.descMD = this.issueFG.value.descMD;
        this.issue.meta.descHTML = this.simpleMDE.simplemde.markdown(this.issueFG.value.descMD);
        let _id = this.issue._id;
        this.issueService.upsertIssue().subscribe(res => {
            if(!res.error) {
                this.mode = 'READ';
                // this.router.navigate(['/issues', _id]);
            }
        });
    }

    onEditClick() {
        this.mode = "WRITE";
        if(!this.issueFG) {
            this.issueFG = this.fb.group({
                name: [this.issue.meta.name, [Validators.required, Validators.minLength(3)]],
                descMD: [this.issue.meta.descMD, [Validators.required, Validators.minLength(6)]],
            });
        }
    }

    onSelectedIndexChange(index) {
        if(index === 1 && this.issue && !this.conversationService.conversation) {
            this.conversationService.findOne(this.issue.cid).subscribe(res => {
                this.conversationLoading = false;
            });
        }
    }

}
