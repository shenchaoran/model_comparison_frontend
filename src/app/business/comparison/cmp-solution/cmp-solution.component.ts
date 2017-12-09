import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CmpSlnService } from '../services/cmp-sln.service';

@Component({
    selector: 'ogms-cmp-solution',
    templateUrl: './cmp-solution.component.html',
    styleUrls: ['./cmp-solution.component.scss']
})
export class CmpSolutionComponent implements OnInit {
    tabs: Array<{
        id: string;
        name: string;
        data: any;
    }>;
    constructor(
        private service: CmpSlnService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.tabs = resolveData.solutionTabTree;
        });
    }
}
