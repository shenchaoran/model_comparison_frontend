import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Route, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import {
    TopicService,
    ConversationService,
    UserService
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
    mode: 'READ' | 'WRITE';
    topicFG: FormGroup;
    mdeOption = { placeholder: 'Topic description...'};
    conversationLoading: boolean = true;
    topicLoading: boolean = true;
    @ViewChild(Simplemde) simpleMDE: any;

    get couldEdit(): boolean {
        return this.user && this.topic && this.topic.auth.userId === this.user._id;
    }

    get user() {
        return this.userService.user;
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
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) {
        super(topicService);
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const topicId = params['id'];
            if(topicId === 'create') {
                this.userService.redirectIfNotLogined();
                this.topicService.createTopic();
                this.mode = 'WRITE';
                this.topicFG = this.fb.group({
                    name: ['', [Validators.required, Validators.minLength(3)]],
                    descMD: ['', [Validators.required, Validators.minLength(6)]],
                });
                this.conversationLoading = false;

            }
            else {
                this.mode = 'READ';
                this.topicService.findOne(topicId).subscribe(res => {
                    this.topicLoading = false;
                });
            }
        });
    }

    onSubmit() {
        this.topic.meta.name = this.topicFG.value.name;
        this.topic.meta.descMD = this.topicFG.value.descMD;
        this.topic.meta.descHTML = this.simpleMDE.simplemde.markdown(this.topicFG.value.descMD);
        let _id = this.topic._id;
        this.topicService.upsertTopic().subscribe(res => {
            if(!res.error) {
                this.mode = 'READ';
                // this.router.navigate(['/topics', _id]);
            }
        });
    }

    onEditClick() {
        this.mode = "WRITE";
        if(!this.topicFG) {
            this.topicFG = this.fb.group({
                name: [this.topic.meta.name, [Validators.required, Validators.minLength(3)]],
                descMD: [this.topic.meta.descMD, [Validators.required, Validators.minLength(6)]],
            });
        }
    }

    onSelectedIndexChange(index) {
        if(index === 1 && this.topic && !this.conversationService.conversation) {
            this.conversationService.findOne(this.topic.cid).subscribe(res => {
                this.conversationLoading = false;
            });
        }
    }

}
