import { Component, OnInit, Inject } from '@angular/core';

import { MapToolbarItemCfg } from '../model/map-toolbar-config.class';
import { ToolbarService } from '../services/toolbar.service';
import { OlMapService } from '../services/ol-map.service';

@Component({
    selector: 'ogms-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    // 两种布局：row 和 column
    _LAYOUT: string = 'row';
    toolbarItems: Array<MapToolbarItemCfg>;
    constructor(
        private service: ToolbarService,
        @Inject('MAP_TOOLBAR_CONFIG') private toolbarCfg,
        private olMapService: OlMapService
    ) {
        this.service.init(toolbarCfg);
    }

    ngOnInit() {
        this.toolbarItems = this.service.getToolbarItem();
    }

    onItemClick(item) {
        const updated = this.service.publishClickEvent(item);
        this.updateItem(updated);
    }

    updateItem(updated) {
        _.map(this.toolbarItems, item => {
            if(item.id === updated.id) {
                item = updated;
            }
        });
    };
}
