import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { setTimeout } from 'core-js/library/web/timers';
import { OlMapService } from '@feature/ol-map/ol-map.module.ts';
declare var ol: any;
import { CmpState } from '@models';

@Component({
    selector: 'ogms-ascii-grid',
    templateUrl: './ascii-grid.component.html',
    styleUrls: ['./ascii-grid.component.scss']
})
export class AsciiGridComponent implements OnInit, AfterViewInit {
    targetId;
    @Input() imageLayers;
    map;

    constructor(
        private olMapService: OlMapService
    ) {
        this.targetId = uuidv1();
    }

    ngOnInit() {}

    ngAfterViewInit() {
        // console.log(jQuery(`#${this.targetId}`).length);
        setTimeout(() => {
            console.log(this);
            console.log(jQuery(`#${this.targetId}`).length);

            const overlayGroup = new ol.layer.Group({
                title: 'Layers',
                layers: [
                    new ol.layer.Tile({ 
                        title: 'OSM',
                        visible: true,
                        source: new ol.source.OSM() 
                    })
                ]
            });
            this.map = new ol.Map({
                target: this.targetId,
                layers: [overlayGroup],
                view: new ol.View({
                    center: [0, 0],
                    zoom: 2
                }),
                controls: ol.control.defaults({
                    attribution: false,
                    rotate: false,
                    zoom: false
                }).extend([
                    new ol.control.FullScreen(),
                    new ol.control.ScaleLine()
                ])
            });

            const extents = [];
            let extent;
            _.map(this.imageLayers, imgLayer => {
                if(imgLayer.state === CmpState.FINISHED_SUCCEED) {
                    overlayGroup.getLayers().push(
                        new ol.layer.Image({
                            title: imgLayer.title,
                            source: new ol.source.ImageStatic({
                                ratio: 1,
                                params: {

                                },
                                url: imgLayer.path,
                                imageExtent: imgLayer.extent,
                                projection: 'EPSG:3857'
                            })
                        })
                    );
                    extents.push(imgLayer.extent);
                }
            });
            extent = this.olMapService.getMapExtent(extents);
            
            this.map.getView().fit(extent, this.map.getSize());
            const layerSwitcher = new ol.control.LayerSwitcher({
                tipLabel: 'LayerSwitcher'
            });
            this.map.addControl(layerSwitcher);
        }, 0);
    }
}
