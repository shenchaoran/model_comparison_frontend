import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

import { ModelToolService } from '../../services/model-tool.service';

@Component({
    selector: 'app-model-tool-lib-list',
    templateUrl: './model-tool-lib-list.component.html',
    styleUrls: ['./model-tool-lib-list.component.scss']
})
export class ModelToolLibListComponent implements OnInit, AfterViewInit {
    models;
    selectedModelId;
    constructor(
        private modelToolService: ModelToolService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.models = data.modelTools;
        });
    }

    ngAfterViewInit() {
        this.onResize();
    }

    onResize() {
        
    }

    onModelToolClick(model) {
        // jQuery('#container li').removeClass('selected-li');
        this.selectedModelId = model._id;
        postal.channel('LAYOUT_CHANNEL').publish('invoke-panel.show', model);
    }
}
