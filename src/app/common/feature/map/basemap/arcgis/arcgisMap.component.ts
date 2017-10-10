import { Component, Inject, ViewChild, ViewEncapsulation, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'arcgis-maps',
    templateUrl: './arcgisMap.component.html',
    // styleUrls: ['./arcgisMap.css']
})
export class ArcgisMaps {
    @Input()
    mapId: string;
    @Input()
    private mapType: string;


    private mapConfig: any;
    private errorMessage: any;


    constructor(private activatedRoute: ActivatedRoute, @Inject('mapService') private mapService) {
    }

    ngOnInit() {
        // let mapConfig = this.activatedRoute.snapshot.data['mapConfig'];

        // if (mapConfig) {
        //     this.mapService.subscribeTopics();
        //     this.mapService.setMapConfig(mapConfig);
        // } else {
        //     console.error('#map.component#mapConfig is undefined');
        // }
    }

    ngAfterViewInit() {
        //放在AfterViewInit中，此时div元素已被构建完成
        const esriLoad = this.activatedRoute.snapshot.data['esriModules'];

        if (esriLoad) {
            // create the map
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
    }

    // ngOnDestroy(){
    //     this.mapService.unsubscribeTopics();
    // }
}
