import { Component, Inject, HostListener, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OpenLayersService } from './openlayersMap.service';
import { MAP_CONFIG } from '@config/map.config';


@Component({
    selector: 'openlayers-maps',
    templateUrl: './openlayersMap.component.html',
    styleUrls: ['./openlayersMap.css']
})
export class OpenLayersMaps {
    @Input()
    mapId: string;
    @Input()
    mapType: string;


    private mapConfig: any;
    private errorMessage: any;

    private containerWidth;


    constructor(@Inject('mapService') private mapService) {

    }

    ngOnInit() {
        this.mapService.setMapConfig(MAP_CONFIG);
    }

    ngAfterViewInit() {
        this.containerWidth = jQuery('#'+this.mapId).width();


        if (this.mapType === 'compare' || this.mapType === 'swipe') {

            this.mapService.createDoubleMap(this.mapId).subscribe({
                next: null,
                error: error => this.errorMessage = <any>error,
                complete: () => {
                    this.mapService.loadDefaultLayers(this.mapId);
                }
            });
        } else {
            this.mapService.createMap(this.mapId).subscribe({
                next: null,
                error: error => this.errorMessage = <any>error,
                complete: () => {
                    this.mapService.loadDefaultLayers();
                }
            });
        }
    }

    ngAfterViewChecked() {
        let width = jQuery('#'+this.mapId).width();
        if(this.containerWidth !== width){
            this.containerWidth = width;
            
            this.mapService.mapResize(this.mapId);
        }
    }
}
