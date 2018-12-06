import { Component, OnInit, HostListener } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { OgmsBaseComponent } from '@shared';
import { get, findIndex } from 'lodash';
import { ConversationService, MSService, UserService } from "@services";
import { Topic, Solution, CalcuTask, } from '@models';

@Component({
    selector: 'ogms-geo-model-detail',
    templateUrl: './geo-model-detail.component.html',
    styleUrls: ['./geo-model-detail.component.scss']
})
export class GeoModelDetailComponent extends OgmsBaseComponent implements OnInit {
    ms: any;
    calcuTasks: CalcuTask[];
    // topic: Topic;
    solutions: Solution[];
    displayedColumns = ["name", "description", "schemaId", "ext"];
    hadTriggeredConversation: boolean = false;

    get user() { return this.conversationService.user; }
    get users() { return this.conversationService.users; }
    get inputs() { return get(this, 'ms.MDL.IO.inputs'); }
    get parameters() { return get(this, 'ms.MDL.IO.parameters'); }
    get outputs() { return get(this, 'ms.MDL.IO.outputs'); }
    get conversation() { return this.conversationService.conversation; }
    get includeUser() { return findIndex(get(this, 'ms.subscribed_uids'),  v => v === this.user._id) !== -1;}
    constructor(
        public route: ActivatedRoute,
        public msService: MSService,
        public title: DynamicTitleService,
        private conversationService: ConversationService,
        private userService: UserService,
    ) {
        super();
    }

    ngOnInit() {
        const msId = this.route.snapshot.paramMap.get('id');
        this.msService.findOne(msId).subscribe(res => {
            if(!res.error) {
                this.ms = res.data.ms;
                this.solutions = res.data.solutions;
                this.calcuTasks = res.data.calcuTasks;

                this.title.setTitle(this.ms.MDL.meta.name);
            }
        });
    }

    onTabChange(index) {
        if(index === 2 && !this.hadTriggeredConversation) {
            this.conversationService.findOneByWhere({
                pid: this.ms._id
            }).subscribe(res => {
                if(!res.error) {
                    this.hadTriggeredConversation = true;
                    this.conversationService.import(
                        res.data.conversation,
                        res.data.users,
                        res.data.commentCount,
                        this.ms.auth.userId,
                        this.ms._id,
                        'ms'
                    );
                }
            })
        }
    }
    
    onSubscribeToggle() {
        let ac = this.includeUser ? 'unsubscribe' : 'subscribe';
        this.userService.toggleSubscribe('ms', ac, this.ms._id).subscribe(res => {
            if (!res.error) {
                let i = this.ms.subscribed_uids.findIndex(v => v === this.user._id);
                if (ac === 'subscribe')
                    i === -1 && this.ms.subscribed_uids.push(this.user._id);
                else
                    i !== -1 && this.ms.subscribed_uids.splice(i, 1);
            }
        });
    }
}
