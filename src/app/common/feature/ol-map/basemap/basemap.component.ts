// 只有一个地图，没有其他控件
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  AfterViewChecked,
  HostListener
} from '@angular/core';
import * as ol from 'openlayers';
import { Observable } from 'rxjs';

import { Layer, LAYER_TYPE, Map, MAP_TYPE } from '../models';
import { OlMapService } from '../services/ol-map.service';
import { ErrorHandle } from '@common/core/base/error-handle';

@Component({
  selector: 'ogms-basemap',
  templateUrl: './basemap.component.html',
  styleUrls: ['./basemap.component.scss']
})
export class BasemapComponent extends ErrorHandle
  implements OnInit, AfterViewInit {
  @Input() targetId: string;
  @Input() mapType: MAP_TYPE;

  mapId: string;

  containerWidth;

  constructor(private olMapService: OlMapService) {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.mapType === MAP_TYPE.SIMPLE) {
      if (this.targetId === '') {
        return this.handleError(new Error('Error map container id!'));
      }
      this.mapId = this.olMapService.createDefaultMap(this.targetId);

      this.resize();
      postal
        .channel('MAP_CHANNEL')
        .publish('map.after-create-default', undefined);
    } else if (
      this.mapType === MAP_TYPE.COMPARE ||
      this.mapType === MAP_TYPE.SWIPE
    ) {
    }
  }

  // re draw
  @HostListener('window:resize')
  resize() {
    this.olMapService.mapResize();
  }
}
