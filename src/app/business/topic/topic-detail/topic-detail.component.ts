import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {
    TopicService,
    ConversationService,
    UserService,
    SolutionService,
} from '../../services';
import {
    Topic,
    Conversation,
    Comment,
    Solution,
} from '../../models';
import { Simplemde } from 'ng2-simplemde';

@Component({
    selector: 'ogms-topic-detail',
    templateUrl: './topic-detail.component.html',
    styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {
    editMode: 'READ' | 'WRITE';
    _originTitle: string;
    _originDesc: string;
    slnFilter: string = '';

    mdeOption = { placeholder: 'Topic description...' };
    @ViewChild(Simplemde) simpleMDE: any;

    get couldEdit(): boolean { return this.user && this.topic && this.topic.auth.userId === this.user._id; }
    get user() { return this.userService.user; }
    get users() { return this.conversationService.users; }
    get topic(): Topic { return this.topicService.topic; }
    get conversation(): Conversation { return this.conversationService.conversation; }
    get solutions(): Solution[] { return this.solutionService.solutionList; }
    get selectedSolutions(): Solution[] { return this.solutions.filter(v => v.topicId === this.topic._id); }
    get includeUser() { return this.topic.subscribed_uids && this.topic.subscribed_uids.findIndex(v => v === this.user._id) !== -1; }
    get hadSaved() { return this.topicService.hadSaved; }

    constructor(
        private topicService: TopicService,
        private conversationService: ConversationService,
        private userService: UserService,
        private solutionService: SolutionService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const topicId = params['id'];
            this.editMode = 'READ';
            this.editMode = 'READ';
            this.topicService.findOne(topicId).subscribe(res => {
                if (!res.error) {
                    if (this.couldEdit && !this.topic.meta.wikiMD) {
                        this.editMode = 'WRITE';
                        this.snackBar.open('please improve the wiki documentation as soon as possible!', null, {
                            duration: 2000,
                            verticalPosition: 'top',
                            horizontalPosition: 'end',
                        });
                    }
                }
            });
        });
    }

    onSlnLiClick(sln) {
        this.topicService.changeIncludeSln(sln).subscribe(res => { });
    }

    onSlnFilterChange(filter) {

    }

    onEditSave() {
        this.topic.meta.wikiHTML = this.simpleMDE.simplemde.markdown(this.topic.meta.wikiMD);
        this.topicService.upsert().subscribe(res => {
            this.editMode = 'READ';
        });
    }

    onEditCancel() {
        this.topic.meta.name = this._originTitle;
        this.topic.meta.wikiMD = this._originDesc;
        this.editMode = 'READ';
    }

    onEditClick() {
        this.editMode = "WRITE";
        this._originTitle = this.topic.meta.name;
        this._originDesc = this.topic.meta.wikiMD;
    }

    onSubscribeToggle() {
        let ac = this.includeUser ? 'unsubscribe' : 'subscribe';
        this.topicService.subscribeToggle(ac, this.user._id).subscribe(res => { });
    }

    onSelectedIndexChange(index) {
        // if(index === 1 && this.topic && !this.conversationService.conversation) {
        //     this.conversationService.findOne(this.topic.cid).subscribe(res => {});
        // }
    }

}
