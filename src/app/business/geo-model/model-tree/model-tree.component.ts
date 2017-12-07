import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtree';

import { ModelService } from '../services/model.service';

@Component({
    selector: 'ogms-model-tree',
    templateUrl: './model-tree.component.html',
    styleUrls: ['./model-tree.component.scss']
})
export class ModelTreeComponent implements OnInit, AfterViewInit {
    source: Array<any> = undefined;
    @ViewChild('jqxTree') jqxTree: jqxTreeComponent;
    constructor(private service: ModelService) {}

    ngOnInit() {
        this.service.getModelTree()
            .subscribe(response => {
                if(response.error !== undefined) {

                }
                else {
                    this.source = response.data;
                }
            });
    }

    ngAfterViewInit() {
        
    }
}
