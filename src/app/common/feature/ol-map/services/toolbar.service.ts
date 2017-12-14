import { Injectable, Inject } from '@angular/core';

import { MAP_MODULES_CONFIG, MAP_TOOLBAR_CONFIG } from '@config/map.config';
import { MapToolBarItemType, MapToolbarItemCfg } from '../model/map-toolbar-config.class';
import { OlMapService } from '../services/ol-map.service';

@Injectable()
export class ToolbarService {
    private toolbarCfg;
    constructor(
        private olMapService: OlMapService
    ) {}

    init(toolbarCfg) {
        this.toolbarCfg = toolbarCfg;
    }

    private set item(v) {
        _.map(this.toolbarCfg, item => {
            if (item.id === v.id) {
                item = v;
            }
        });
    }

    getToolbarItem() {
        return _.filter(this.toolbarCfg, item => item.load === true);
    }

    publishClickEvent(item): MapToolbarItemCfg {
        if (item.type === MapToolBarItemType.TOGGLE) {
            item.activated = !item.activated;
        }
        this.item = item;

        switch (item.id) {
            case 'pan':
                this.olMapService.pan();
                break;
            case 'fullExtent':
                this.olMapService.fullExtent();
                break;
            case 'zoomIn':
                this.olMapService.zoomIn();
                break;
            case 'zoomOut':
                this.olMapService.zoomOut();
                break;
            case 'measureLength':
                this.olMapService.measureLength();
                break;
            case 'measureArea':
                this.olMapService.measureArea();
                break;
            case 'drawPoint':
                this.olMapService.drawPoint();
                break;
            case 'drawLine':
                this.olMapService.drawLine();
                break;
            case 'drawPolygon':
                this.olMapService.drawPolygon();
                break;
            case 'selectByCircle':
                this.olMapService.selectByCircle();
                break;
            case 'selectByRectangle':
                this.olMapService.selectByRectangle();
                break;
            case 'selectByPolygon':
                this.olMapService.selectByPolygon();
            case 'clearGraphics':
                this.olMapService.clearDraw();
                break;
        }
        console.log(`toolbar: ${item.id}, activated: ${item.activated}`);
        return item;
    }
}
