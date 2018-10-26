import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatSnackBar} from '@angular/material';
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
import { DefaultLifeHook } from '../../../common/shared/classes/default-life-hook.class';
import { Simplemde } from 'ng2-simplemde';

@Component({
    selector: 'ogms-topic-detail',
    templateUrl: './topic-detail.component.html',
    styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent extends DefaultLifeHook implements OnInit {
    titleMode: 'READ' | 'WRITE';
    descMode: 'READ' | 'WRITE';
    _originTitle: string;
    _originDesc: string;
    slnFilter: string = '';

    mdeOption = { placeholder: 'Topic description...'};
    @ViewChild(Simplemde) simpleMDE: any;

    get couldEdit(): boolean {return this.user && this.topic && this.topic.auth.userId === this.user._id;}
    get user() {return this.userService.user;}
    get users() {return this.conversationService.users;}
    get topic(): Topic {return this.topicService.topic;}
    get conversation(): Conversation {return this.conversationService.conversation;}
    get solutions(): Solution[] {return this.topicService.solutionList;}
    get selectedSolutions(): Solution[] {return this.solutions.filter(v => v.topicId === this.topic._id);}
    get includeUser() {return this.topic.subscribed_uids && this.topic.subscribed_uids.findIndex(v => v === this.user._id) !== -1;}
    get hadSaved() {return this.topicService.hadSaved;}

    constructor(
        private topicService: TopicService,
        private conversationService: ConversationService,
        private userService: UserService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
    ) {
        super(topicService);
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const topicId = params['id'];
            // if(topicId === 'create') {
            //     this.topicService.create();
            //     this.descMode = 'WRITE';
            //     this.titleMode = 'WRITE';
            //     this._originDesc = null;
            //     this._originTitle = null;
            // }
            // else {
                this.descMode = 'READ';
                this.titleMode = 'READ';
                this.topicService.findOne(topicId).subscribe(res => {
                    if(!res.error) {
                        if(this.couldEdit && !this.topic.meta.wikiMD) {
                            this.descMode = 'WRITE';
                            this.snackBar.open('please improve the wiki documentation as soon as possible!', null, {
                                duration: 2000,
                                verticalPosition: 'top',
                                horizontalPosition: 'end',
                            });
                        }
                    }
                });
            // }
        });
    }

    // onSlnHeaderClick() {
    //     if(this.fullSlnListLoading) {
    //         this.solutionService.findAll({
    //             pageSize: 20,
    //             pageIndex: 1,
    //         }).subscribe(res => {
    //             this.fullSlnListLoading = false;
    //         });
    //     }
    // }

    onSlnLiClick(sln) {
        this.topicService.changeIncludeSln(sln).subscribe(res => {});
    }

    onSlnFilterChange(filter) {

    }

    onTitleEditSave() {
        this.topicService.upsert().subscribe(res => {
            this.titleMode = 'READ';
        });
    }

    onTitleEditCancel() {
        this.topic.meta.name = this._originTitle;
        this.titleMode = 'READ';
    }

    onTitleEditClick() {
        this.titleMode = "WRITE";
        this._originTitle = this.topic.meta.name;
    }

    onDescEditCancel() {
        this.descMode = 'READ';
        this.topic.meta.wikiMD = this._originDesc;
    }

    onDescEditSave() {
        this.topic.meta.wikiHTML = this.simpleMDE.simplemde.markdown(this.topic.meta.wikiMD);
        this.topicService.upsert().subscribe(res => {
            this.descMode = 'READ';
        });
    }
    
    onDescEditClick() {
        this.descMode = "WRITE";
        this._originDesc = this.topic.meta.wikiMD;
    }

    onSubscribeToggle() {
        let ac = this.includeUser? 'unsubscribe': 'subscribe';
        this.topicService.subscribeToggle(ac, this.user._id).subscribe(res =>{});
    }

    onSelectedIndexChange(index) {
        // if(index === 1 && this.topic && !this.conversationService.conversation) {
        //     this.conversationService.findOne(this.topic.cid).subscribe(res => {});
        // }
    }

}
