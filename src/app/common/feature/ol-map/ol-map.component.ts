import { Component, OnInit, Inject, Optional } from '@angular/core';
import { OlMapService, ToolbarService } from './services';
import * as uuidv1 from 'uuid/v1';

@Component({
  selector: 'ogms-ol-map',
  template: `
      <ogms-layout [targetId]='targetId'></ogms-layout>
      <!-- <ogms-basemap [targetId]="'asdfasd'" [mapType]='0'></ogms-basemap> -->
  `,
  styles: [],
  providers: []
})
export class OlMapComponent implements OnInit {
  targetId: string;
  constructor(
    private service: OlMapService,
    private toolBarService: ToolbarService,
    @Inject('MAP_TOOLBAR_CONFIG')
    @Optional()
    private MAP_TOOLBAR_CONFIG
  ) {
    this.targetId = uuidv1();
  }

  ngOnInit() {
    postal
      .channel('MAP_CHANNEL')
      .subscribe('map.create-default', (data, envelope) => {
        this.toolBarService.init(this.service, this.MAP_TOOLBAR_CONFIG);
      });
  }
}
