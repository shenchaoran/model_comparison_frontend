import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    OnChanges,
    SimpleChange
} from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { setTimeout } from 'core-js/library/web/timers';
import { OlMapService } from '@feature/ol-map/ol-map.module.ts';
import { GeoJSONService } from '@feature/ol-map/services/geojson.service'; 
declare var ol: any;
import { CmpState } from '@models';

@Component({
    selector: 'ogms-geojson-map',
    templateUrl: './geojson-map.component.html',
    styleUrls: ['./geojson-map.component.scss']
})
export class GeojsonMapComponent implements OnInit, AfterViewInit {
    @Input() geojson;
    map;
    targetId;
    
    constructor(private olMapService: OlMapService) {
        this.targetId = uuidv1();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        const baseGroup = new ol.layer.Group({
            title: 'Base',
            layers: [
                new ol.layer.Tile({
                    title: 'OSM',
                    visible: true,
                    source: new ol.source.OSM()
                })
            ]
        });

        if (this.geojson) {
            this.olMapService.addFeaturesByJSON(this.geojson);
            const geojsonService = new GeoJSONService(this.geojson);
            const imageExtent = geojsonService.getExtent();
            this.olMapService.selectedMap.getView().fit(imageExtent, this.olMapService.selectedMap.getSize());
        }
        const dataGroup = new ol.layer.Group({
            title: 'Data',
            layers: [
                new ol.layer
            ]
        })


        this.map = new ol.Map({
            target: this.targetId,
            layers: [
                baseGroup
            ],
            view: new ol.View({
                center: [0, 0],
                zoom: 2
            }),
            controls: ol.control
                .defaults({
                    attribution: false,
                    rotate: false,
                    zoom: false
                })
                .extend([
                    new ol.control.FullScreen(),
                    new ol.control.ScaleLine()
                ])
        });
        const layerSwitcher = new ol.control.LayerSwitcher({
            tipLabel: 'LayerSwitcher'
        });
        this.map.addControl(layerSwitcher);
    }
}
