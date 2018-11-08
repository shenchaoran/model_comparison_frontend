import { Component, OnInit, HostListener } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { OgmsBaseComponent } from '@shared';
import { get } from 'lodash';
import { ConversationService, MSService } from "@services";

@Component({
    selector: 'ogms-geo-model-detail',
    templateUrl: './geo-model-detail.component.html',
    styleUrls: ['./geo-model-detail.component.scss']
})
export class GeoModelDetailComponent extends OgmsBaseComponent implements OnInit {
    ms: any;
    displayedColumns = ["name", "description", "schemaId", "ext"];
    hadTriggered: boolean = false;

    get inputs() { return get(this, 'ms.MDL.IO.inputs'); }
    get parameters() { return get(this, 'ms.MDL.IO.parameters'); }
    get outputs() { return get(this, 'ms.MDL.IO.outputs'); }
    get conversation() { return this.conversationService.conversation; }
    constructor(
        public route: ActivatedRoute,
        public msService: MSService,
        public title: DynamicTitleService,
        private conversationService: ConversationService,
    ) {
        super();
    }

    ngOnInit() {
        const msId = this.route.snapshot.paramMap.get('id');
        this.msService.findOne(msId).subscribe(res => {
            if(!res.error) {
                this.ms = res.data.ms;

                this.title.setTitle(this.ms.MDL.meta.name);
            }
        })
    }

    onTabChange(index) {
        if(index === 2 && !this.hadTriggered) {
            this.conversationService.findOneByWhere({
                pid: this.ms._id
            }).subscribe(res => {
                if(!res.error) {
                    this.hadTriggered = true;
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
}
