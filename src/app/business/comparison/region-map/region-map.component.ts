import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  AfterViewChecked,
  HostListener,
  Inject,
  Optional
} from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { OlMapService } from '@feature/ol-map/services/ol-map.service';
import { ToolbarService } from '../services';

@Component({
  selector: 'ogms-region-map',
  templateUrl: './region-map.component.html',
  styleUrls: ['./region-map.component.scss']
})
export class RegionMapComponent implements OnInit, AfterViewInit {
  targetId: string;
  mapId;
  @Output() onDrawRecEnd = new EventEmitter<any>();
  @Input() imageStaticLayers: Array<any>;
  constructor(
    private olMapService: OlMapService,
    private toolBarService: ToolbarService,
    @Inject('MAP_TOOLBAR_CONFIG')
    @Optional()
    private MAP_TOOLBAR_CONFIG
  ) {
    this.targetId = uuidv1();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.mapId = this.olMapService.createDefaultMap(this.targetId);
    this.toolBarService.init(this.olMapService, this.MAP_TOOLBAR_CONFIG);
    this.toolBarService.onDrawRecEnd().subscribe(data => {
      this.onDrawRecEnd.emit();
    });

    this.resize();
    postal
      .channel('MAP_CHANNEL')
      .publish('map.after-create-default', undefined);
  }

  // re draw
  @HostListener('window:resize')
  resize() {
    this.olMapService.mapResize();
  }
}
