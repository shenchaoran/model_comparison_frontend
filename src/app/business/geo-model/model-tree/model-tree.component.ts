import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtree';
import { ActivatedRoute } from '@angular/router';

import { MSService } from '../services/model.service';

@Component({
    selector: 'ogms-model-tree',
    templateUrl: './model-tree.component.html',
    styleUrls: ['./model-tree.component.scss']
})
export class ModelTreeComponent implements OnInit, AfterViewInit {
    source: Array<any> = undefined;
    @ViewChild('jqxTree') jqxTree: jqxTreeComponent;
    constructor(
        private service: MSService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.data.subscribe(resolveData => {
            this.source = resolveData.geoModelTree;
        });
    }

    ngAfterViewInit() {
        
    }
}
