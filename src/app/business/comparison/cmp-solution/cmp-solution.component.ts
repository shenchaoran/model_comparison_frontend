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
    selectedSln: string;

    constructor(
        private service: CmpSlnService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.tabs = resolveData.solutionTabTree;
        });
    }

    onTabItemSelected(item) {
        if(item.value) {
            this.selectedSln = item.value;
            localStorage.setItem('cmpSolution', JSON.stringify(item.value));
        }
    }
}
