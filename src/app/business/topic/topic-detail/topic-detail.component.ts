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
    
    topic: Topic;
    solutionList: Solution[];
    solutionCount: number;

    get couldEdit(): boolean { return this.user && this.topic && this.topic.auth.userId === this.user._id; }
    get user() { return this.userService.user; }
    get users() { return this.conversationService.users; }
    get conversation(): Conversation { return this.conversationService.conversation; }
    get selectedSolutions(): Solution[] { return this.solutionList.filter(v => v.topicId === this.topic._id); }
    get includeUser() { return this.topic.subscribed_uids && this.topic.subscribed_uids.findIndex(v => v === this.user._id) !== -1; }

    constructor(
        private topicService: TopicService,
        private conversationService: ConversationService,
        private userService: UserService,
        private solutionService: SolutionService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
    ) { }

    ngOnInit() {
        const topicId = this.route.snapshot.paramMap.get('id');
        this.editMode = 'READ';
        this.topicService.findOne(topicId).subscribe(res => {
            if (!res.error) {
                this.topic = res.data.topic;
                this.solutionList = res.data.solutions;
                this.solutionCount = res.data.solutionCount;
                this.conversationService.import(
                    res.data.conversation,
                    res.data.users,
                    res.data.commentCount,
                    res.data.topic.auth.userId,
                    res.data.topic._id,
                );
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
    }

    onSlnLiClick(sln) {
        let ac = sln.topicId === this.topic._id? 'remove': 'add';
        this.topicService.changeIncludeSln(this.topic._id, ac, sln).subscribe(res => {
            if(!res.error) {
                let i = this.topic.solutionIds.indexOf(sln._id);
                if(ac === 'remove') {
                    i !== -1 && this.topic.solutionIds.splice(i, 1);
                }
                else {
                    i === -1 && this.topic.solutionIds.push(sln._id);
                }
            }
        })
    }

    onSlnFilterChange(filter) {

    }

    onEditSave() {
        this.topic.meta.wikiHTML = this.simpleMDE.simplemde.markdown(this.topic.meta.wikiMD);
        this.topicService.patch(this.topic._id, { topic: this.topic }).subscribe(res => {
            if(!res.error) {
                this.editMode = 'READ';
            }
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
        this.topicService.subscribeToggle(this.topic._id, ac, this.user._id).subscribe(res => {
            if(!res.error) {
                let i = this.topic.subscribed_uids.findIndex(v => v === this.user._id);
                if(ac === 'subscribe') 
                    i === -1 && this.topic.subscribed_uids.push(this.user._id);
                else 
                    i !== -1 && this.topic.subscribed_uids.splice(i, 1);
            }
        });
    }

    onSelectedIndexChange(index) {
        // if(index === 1 && this.topic && !this.conversationService.conversation) {
        //     this.conversationService.findOne(this.topic.cid).subscribe(res => {});
        // }
    }

}
