import { Component, Inject, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MapInquireService } from './map.inquire.service';

@Component({
    selector: 'map-view',
    template: `
        <mapView-anchor></mapView-anchor>
    `,
    styles: []
})

export class MapView {

    constructor(private activatedRoute: ActivatedRoute, private mapInquireService: MapInquireService, @Inject('mapService') private mapService) {

    }

    ngOnInit() {
        this.mapInquireService.subscribeTopics();

        let mapConfig = this.activatedRoute.snapshot.data['mapConfig'];

        if (mapConfig) {
            this.mapService.subscribeTopics();
            this.mapService.setMapConfig(mapConfig);
        } else {
            console.error('#map.component#mapConfig is undefined');
        }
    }

    ngOnDestroy() {
        this.mapInquireService.unsubscribeTopics();
        this.mapService.unsubscribeTopics();
    }

    ngAfterViewInit() {
        postal.channel("MAPVIEW_CHANNEL").publish("map.create");
    }
}