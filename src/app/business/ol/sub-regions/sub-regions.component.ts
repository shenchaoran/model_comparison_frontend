import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, HostListener, Inject } from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { API } from '@config';
import { OlService } from '../services/ol.service';
import { defaults as defaultControls } from 'ol/control/util';
import ScaleLine from 'ol/control/ScaleLine';
import FullScreen from 'ol/control/FullScreen';
import Map from 'ol/Map';
import View from 'ol/View';
import { Group, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource, OSM, TileWMS } from 'ol/source';
import Draw, { createBox } from 'ol/interaction/Draw';
import { fromLonLat } from 'ol/proj'
import * as proj from 'ol/proj';
// declare var createBox: any;

@Component({
    selector: 'ogms-sub-regions',
    templateUrl: './sub-regions.component.html',
    styleUrls: ['./sub-regions.component.scss']
})
export class SubRegionsComponent implements OnInit, AfterViewInit {
    @Input() dataset;
    @Output() onRegionsChange = new EventEmitter<any>();
    regions = []

    targetId;
    map;
    baseLayerGroup;
    vectorLayer;
    vectorSource;

    constructor(
        private olService: OlService,
    ) {
        this.targetId = uuidv1();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.buildMap();
        }, 0);
    }

    buildMap() {
        this.baseLayerGroup = new Group({
            layers: [
                new TileLayer({
                    title: 'OSM',
                    visible: true,
                    source: new OSM()
                } as any)
            ]
        });

        this.vectorSource = new VectorSource();
        this.vectorLayer = new VectorLayer({ source: this.vectorSource})

        let view = new View({
            center: [0, 0],
            zoom: 1
        });

        this.map = new Map({
            target: this.targetId,
            layers: [
                this.baseLayerGroup,
                this.vectorLayer,
            ],
            view: view,
            controls: new defaultControls({
                // attribution: false,
                rotate: false,
                zoom: false
            }).extend([new FullScreen(), new ScaleLine()])
        } as any);

        console.log(Object.keys(Draw))
        let draw = new Draw({
            source: this.vectorSource,
            type: 'Circle',
            geometryFunction: createBox(),
        })
        draw.on('drawend', (e: any)=> {
            let bbox = e.feature.getGeometry().getExtent();
            bbox = (proj as any).transformExtent(bbox, 'EPSG:3857', 'EPSG:4326')
            this.regions.push(bbox);
            this.onRegionsChange.emit(this.regions);
        })
        this.map.addInteraction(draw);

        this.resize();
    }

    @HostListener('window:resize')
    resize() {
        this.map.updateSize();
    }
}
