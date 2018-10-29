import { Component, OnInit, HostListener, OnDestroy, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DocBaseComponent } from '@shared';
import { ConversationService, SolutionService, UserService } from "@services";
import { Simplemde } from 'ng2-simplemde';

@Component({
    selector: 'ogms-solution-detail',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss']
})
export class SolutionDetailComponent implements OnInit {
    editMode: 'READ' | 'WRITE';
    
    _originTitle: string;
    _originWiki: string;
    _originDesc: string;

    mdeOption = { placeholder: 'Solution description...' };
    @ViewChild(Simplemde) simpleMDE: any;

    get user() { return this.userService.user; }
    get users() { return this.conversationService.users; }
    get solution() { return this.solutionService.solution; }
    get couldEdit() { return this.user && this.solution && this.solution.auth.userId === this.user._id; }
    get conversation() { return this.conversationService.conversation; }
    get topic() { return this.solutionService.topic; }
    get tasks() { return this.solutionService.tasks; }
    get mss() { return this.solutionService.mss; }
    get includeUser() { return this.solution.subscribed_uids && this.solution.subscribed_uids.findIndex(v => v === this.user._id) !== -1; }

    constructor(
        public route: ActivatedRoute,
        public solutionService: SolutionService,
        public title: DynamicTitleService,
        public conversationService: ConversationService,
        public userService: UserService,
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const solutionId = params['id'];
            this.editMode = 'READ';
            this.solutionService.findOne(solutionId).subscribe(res => { });
        });
    }

    onEditClick() {
        this.editMode = 'WRITE';
        this._originDesc = this.solution.meta.desc;
        this._originWiki = this.solution.meta.wikiMD;
        this._originTitle = this.solution.meta.name;
    }

    onEditSave() {
        this.solution.meta.wikiHTML = this.simpleMDE.simplemde.markdown(this.solution.meta.wikiMD);
        this.solutionService.upsert().subscribe(res => { this.editMode = 'READ'; });
    }

    onEditCancel() {
        this.solution.meta.wikiMD = this._originWiki;
        this.solution.meta.desc = this._originDesc;
        this.solution.meta.name = this._originTitle;
        this.editMode = 'READ';
    }
    
    onSubscribeToggle() {
        let ac = this.includeUser ? 'unsubscribe' : 'subscribe';
        this.solutionService.subscribeToggle(ac, this.user._id).subscribe(res => { });
    }
}
