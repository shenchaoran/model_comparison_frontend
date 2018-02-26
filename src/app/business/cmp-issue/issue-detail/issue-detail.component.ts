import { Component, OnInit } from '@angular/core';
import { CmpIssueService } from '../services';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'ogms-issue-detail',
    templateUrl: './issue-detail.component.html',
    styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {
    issueId: string;
    issue: any;
    constructor(
        private service: CmpIssueService,
        private route: ActivatedRoute,
        private _notice: NzNotificationService
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.issueId = params['id'];
                this.service.findOne(this.issueId)
                    .subscribe(response => {
                        if(response.error) {
                            this._notice.warning('Warning:', 'Get issues failed!');
                        }
                        else {
                            this.issue = response.data.doc;
                        }
                    });
            });
    }

}
