import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
    TopicService,
    ConversationService,
    UserService,
    SlnService,
} from '../../services';
import {
    Topic,
    Conversation,
    Comment,
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

    mdeOption = { placeholder: 'Topic description...'};
    @ViewChild(Simplemde) simpleMDE: any;

    get couldEdit(): boolean {
        return this.user && this.topic && this.topic.auth.userId === this.user._id;
    }

    get user() {
        return this.userService.user;
    }

    get users() {
        return this.conversationService.users;
    }

    get topic(): Topic {
        return this.topicService.topic;
    }

    get conversation(): Conversation {
        return this.conversationService.conversation;
    }

    constructor(
        private topicService: TopicService,
        private conversationService: ConversationService,
        private slnService: SlnService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super(topicService);
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const topicId = params['id'];
            if(topicId === 'create') {
                this.userService.redirectIfNotLogined();
                this.topicService.createTopic();
                this.descMode = 'WRITE';
                this.titleMode = 'WRITE';
                this._originDesc = null;
                this._originTitle = null;
            }
            else {
                this.descMode = 'READ';
                this.titleMode = 'READ';
                this.topicService.findOne(topicId).subscribe(res => {});
            }
        });
    }

    onTitleEditSave() {
        this.topicService.upsertTopic().subscribe(res => {
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
        this.topic.meta.descMD = this._originDesc;
    }

    onDescEditSave() {
        this.topic.meta.descHTML = this.simpleMDE.simplemde.markdown(this.topic.meta.descMD);
        this.topicService.upsertTopic().subscribe(res => {
            this.descMode = 'READ';
        });
    }
    
    onDescEditClick() {
        this.descMode = "WRITE";
        this._originDesc = this.topic.meta.descMD;
    }

    onSelectedIndexChange(index) {
        if(index === 1 && this.topic && !this.conversationService.conversation) {
            this.conversationService.findOne(this.topic.cid).subscribe(res => {});
        }
    }

}
