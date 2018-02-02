import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ogms-cmp-solution-list',
    templateUrl: './cmp-solution-list.component.html',
    styleUrls: ['./cmp-solution-list.component.scss']
})
export class CmpSolutionListComponent implements OnInit {
    solutions: any[]
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.solutions = resolveData.solutions;
        });
    }
}
