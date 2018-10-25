import { Component, OnInit, HostListener, OnDestroy, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@common/core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DocBaseComponent } from '@common/shared';
import { ConversationService, SolutionService, UserService } from "@services";
import { DefaultLifeHook } from '../../../common/shared/classes';
import { Simplemde } from 'ng2-simplemde';

@Component({
    selector: 'ogms-solution-detail',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss']
})
export class SolutionDetailComponent extends DefaultLifeHook implements OnInit {
    titleMode: 'READ' | 'WRITE';
    descMode: 'READ' | 'WRITE';
    _originTitle: string;
    _originDesc: string;
    
    mdeOption = { placeholder: 'Solution description...'};
    @ViewChild(Simplemde) simpleMDE: any;
    
    get user() {return this.userService.user;}
    get users() {return this.conversationService.users;}
    get solution() {return this.solutionService.solution;}
    get couldEdit() {return this.user && this.solution && this.solution.auth.userId === this.user._id;}
    get conversation() {return this.conversationService.conversation;}
    get topic() {return this.solutionService.topic;}
    get tasks() {return this.solutionService.tasks;}
    get mss() {return this.solutionService.mss;}
    get includeUser() {return this.solution.subscribed_uids && this.solution.subscribed_uids.findIndex(v => v === this.user._id) !== -1;}

    constructor(
        public route: ActivatedRoute,
        public solutionService: SolutionService,
        public title: DynamicTitleService,
        public conversationService: ConversationService,
        public userService: UserService,
    ) {
        super(solutionService);
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const solutionId = params['id'];
            this.descMode = 'READ';
            this.titleMode = 'READ';
            this.solutionService.findOne(solutionId).subscribe(res => {});
        });
    }

    onTitleEditSave() {
        this.solutionService.upsert().subscribe(res => {
            this.descMode = 'READ';
        });
    }
    onTitleEditCancel() {
        this.solution.meta.name = this._originTitle;
        this.titleMode = 'READ';
    }
    onTitleEditClick() {
        this.titleMode = "WRITE";
        this._originTitle = this.solution.meta.name;
    }

    onDescEditSave() {
        this.solution.meta.descHTML = this.simpleMDE.simplemde.markdown(this.solution.meta.descMD);
        this.solutionService.upsert().subscribe(res => {
            this.descMode = 'READ';
        });
    }
    onDescEditCancel() {
        this.descMode = 'READ';
        this.solution.meta.descMD = this._originDesc;
    }
    onDescEditClick() {
        this.descMode = "WRITE";
        this._originDesc = this.solution.meta.descMD;
    }
    onSubscribeToggle() {
        let ac = this.includeUser? 'unsubscribe': 'subscribe';
        this.solutionService.subscribeToggle(ac, this.user._id).subscribe(res =>{});
    }
}
