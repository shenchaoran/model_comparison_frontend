import { Component, OnInit } from '@angular/core';
import { CmpSlnService } from '../services';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { DynamicTitleService } from '@common/core/services/dynamic-title.service';

@Component({
    selector: 'ogms-solution-detail',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss']
})
export class SolutionDetailComponent implements OnInit {
    solution: any;
    solutionId: string;
    geojson: any;

    constructor(
        private service: CmpSlnService,
        private route: ActivatedRoute,
//private _notice: NzNotificationService,
        private title: DynamicTitleService
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.solutionId = params['id'];
                this.service.findOne(this.solutionId)
                    .subscribe(response => {
                        if(response.error) {
                            // this._notice.warning('Warning:', 'Get solution failed!');
                        }
                        else {
                            this.solution = response.data;
                            this.geojson = _.get(this.solution, 'issue.spatial.geojson')
                            this.title.setTitle(this.solution.meta.name);
                        }
                    });
            });
    }

}
