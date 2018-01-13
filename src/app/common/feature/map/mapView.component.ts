import { Component, Inject, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MapInquireService } from './map.inquire.service';
import { MAP_CONFIG } from '@config/map.config';

@Component({
    selector: 'map-view',
    template: `
        <mapView-anchor></mapView-anchor>
    `,
    styles: []
})

export class MapView {

    constructor(private mapInquireService: MapInquireService, @Inject('mapService') private mapService) {
    }

    ngOnInit() {
        this.mapInquireService.subscribeTopics();
        this.mapService.subscribeTopics();
        this.mapService.setMapConfig(MAP_CONFIG);
    }

    ngOnDestroy() {
        this.mapInquireService.unsubscribeTopics();
        this.mapService.unsubscribeTopics();
    }

    ngAfterViewInit() {
        postal.channel("MAPVIEW_CHANNEL").publish("map.create");
    }
}