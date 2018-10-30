import { Component, OnInit, HostListener, OnDestroy, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { ConversationService, SolutionService, UserService } from "@services";
import { Simplemde } from 'ng2-simplemde';
import { Solution, Task, Topic, MS, } from "@models";

@Component({
    selector: 'ogms-solution-detail',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss']
})
export class SolutionDetailComponent implements OnInit {
    _editMode: 'READ' | 'WRITE';
    _originTitle: string;
    _originWiki: string;
    _originDesc: string;

    mdeOption = { placeholder: 'Solution description...' };
    @ViewChild(Simplemde) simpleMDE: any;

    solution: Solution;
    tasks: Task[];
    topic: Topic;
    mss: MS[];

    get user() { return this.userService.user; }
    get users() { return this.conversationService.users; }
    get couldEdit() { return this.user && this.solution && this.solution.auth.userId === this.user._id; }
    get conversation() { return this.conversationService.conversation; }
    get includeUser() { return this.solution.subscribed_uids && this.solution.subscribed_uids.findIndex(v => v === this.user._id) !== -1; }

    constructor(
        public route: ActivatedRoute,
        public solutionService: SolutionService,
        public title: DynamicTitleService,
        public conversationService: ConversationService,
        public userService: UserService,
    ) { }

    ngOnInit() {
        const solutionId = this.route.snapshot.paramMap.get('id');
        this._editMode = 'READ';
        this.solutionService.findOne(solutionId).subscribe(res => {
            if(!res.error) {
                this.solution = res.data.solution;
                this.tasks = res.data.tasks;
                this.topic = res.data.topic;
                this.mss = res.data.mss;
                this.conversationService.import(
                    res.data.conversation,
                    res.data.users,
                    res.data.commentCount,
                    this.solution.auth.userId,
                    this.solution._id
                );
            }
        });
    }

    onEditClick() {
        this._editMode = 'WRITE';
        this._originDesc = this.solution.meta.desc;
        this._originWiki = this.solution.meta.wikiMD;
        this._originTitle = this.solution.meta.name;
    }

    onEditSave() {
        this.solution.meta.wikiHTML = this.simpleMDE.simplemde.markdown(this.solution.meta.wikiMD);
        this.solutionService.patch(this.solution._id, { solution: this.solution }).subscribe(res => { this._editMode = 'READ'; });
    }

    onEditCancel() {
        this.solution.meta.wikiMD = this._originWiki;
        this.solution.meta.desc = this._originDesc;
        this.solution.meta.name = this._originTitle;
        this._editMode = 'READ';
    }
    
    onSubscribeToggle() {
        let ac = this.includeUser ? 'unsubscribe' : 'subscribe';
        this.solutionService.subscribeToggle(this.solution._id, ac, this.user._id).subscribe(res => {
            if(!res.error) {
                let i = this.solution.subscribed_uids.findIndex(v => v === this.user._id);
                if(ac === 'subscribe') {
                    i === -1 && this.solution.subscribed_uids.push(this.user._id);
                }
                else if(ac === 'unsubscribe') {
                    i !== -1 && this.solution.subscribed_uids.splice(i, 1);
                }
            }
        });
    }
}
