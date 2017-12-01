// 只有一个地图，没有其他控件
import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    AfterViewChecked
} from '@angular/core';
import * as ol from 'openlayers';
import { Observable } from 'rxjs/Observable';

import { Layer, LAYER_TYPE, Map, MAP_TYPE } from '../model';
import { OlMapService } from '../services/ol-map.service';
import { ErrorHandle } from '@common/core/base/error-handle';

@Component({
    selector: 'ogms-basemap',
    templateUrl: './basemap.component.html',
    styleUrls: ['./basemap.component.scss']
})
export class BasemapComponent extends ErrorHandle
    implements OnInit, AfterViewInit, AfterViewChecked {
    @Input() containerId: string;
    @Input() mapType: MAP_TYPE;

    mapId: string;

    containerWidth;

    constructor(private olMapService: OlMapService) {
        super();
    }

    ngOnInit() {}

    ngAfterViewInit() {
        if (this.mapType === MAP_TYPE.SIMPLE) {
            if (this.containerId === '') {
                return this.handleError(new Error('Error map container id!'));
            }
            this.mapId = this.olMapService.createDefaultMap(this.containerId);
        } else if (
            this.mapType === MAP_TYPE.COMPARE ||
            this.mapType === MAP_TYPE.SWIPE
        ) {
        }
    }

    // re draw
    ngAfterViewChecked() {
        let width = jQuery('#' + this.mapId).width();
        if (this.containerWidth !== width) {
            this.containerWidth = width;

            this.olMapService.mapResize();
        }
    }
}
