import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, HostListener, Inject } from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { API } from '@config';
import { OlService } from '../services/ol.service';
import { defaults as defaultControls } from 'ol/control/util';
import ScaleLine from 'ol/control/ScaleLine';
import FullScreen from 'ol/control/FullScreen';
import Map from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import Select from 'ol/interaction/Select';
import * as condition from 'ol/events/condition';
import { Group, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource, OSM, TileWMS } from 'ol/source';
import { Circle, Stroke, Style, Fill, Text } from 'ol/style';
import WMSGetFeatureInfo from 'ol/format/WMSGetFeatureInfo';
import Point from 'ol/geom/Point'
import * as proj from 'ol/proj';
import Feature from 'ol/Feature';
import * as Draw from 'ol/interaction/Draw';

@Component({
    selector: 'ogms-selected-sites',
    templateUrl: './selected-sites.component.html',
    styleUrls: ['./selected-sites.component.scss']
})
export class SelectedSitesComponent implements OnInit, AfterViewInit {
    targetId
    map;
    baseLayerGroup;
    siteLayer;
    siteSource;
    @Input() sites: {
        index: number,
        lat: number,
        long: number,
        coor: number[],
    }[] = [];

    constructor(
        private olService: OlService,
        @Inject('GEOSERVER_LAYER_WS') private layers,
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
                new Tile({
                    title: 'OSM',
                    visible: true,
                    source: new OSM()
                } as any)
            ]
        });
        this.siteSource = new VectorSource();
        this.siteLayer = new VectorLayer({
            title: 'Site',
            source: this.siteSource
        } as any);

        let view = new View({
            center: [0, 0],
            zoom: 1
        });
        this.map = new Map({
            target: this.targetId,
            layers: [
                this.baseLayerGroup,
                this.siteLayer,
            ],
            view: view,
            controls: new defaultControls({
                // attribution: false,
                rotate: false,
                zoom: false
            }).extend([new FullScreen(), new ScaleLine()])
        } as any);

        this.sites.map(site => {
            let coor = [parseFloat((site as any).long), parseFloat((site as any).lat)];
            let xy = (proj as any).fromLonLat(coor, 'EPSG:3857')
            let geom = new Point(xy)
            let feature = new Feature({ 
                geometry: geom 
            })
            this.siteSource.addFeature(feature);
        })

        this.resize();
    }

    @HostListener('window:resize')
    resize() {
        this.map.updateSize();
    }

}
