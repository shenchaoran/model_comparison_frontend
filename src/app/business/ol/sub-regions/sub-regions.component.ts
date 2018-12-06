import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, HostListener, Inject } from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { API } from '@config';
import { OlService } from '../services/ol.service';
import { defaults as defaultControls } from 'ol/control/util';
import ScaleLine from 'ol/control/ScaleLine';
import FullScreen from 'ol/control/FullScreen';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import { Group, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource, OSM, TileWMS } from 'ol/source';
import { Circle, Stroke, Style, Fill, Text } from 'ol/style';
// import Draw, { createBox } from 'ol/interaction/Draw';
import * as Draw from 'ol/interaction/Draw';
import * as Polygon from 'ol/geom/Polygon';
import * as proj from 'ol/proj';
import * as OlEventCondition from 'ol/events/condition';
import Select from 'ol/interaction/Select';

@Component({
    selector: 'ogms-sub-regions',
    templateUrl: './sub-regions.component.html',
    styleUrls: ['./sub-regions.component.scss']
})
export class SubRegionsComponent implements OnInit, AfterViewInit {
    _regions;
    mode: 'READ' | 'WRITE' = 'WRITE';
    @Input()
    set regions(v: any[]) {
        this._regions = v;
        this.mode = 'READ';
    }
    get regions() { return this._regions; }
    @Output() onRegionsChange = new EventEmitter<any>();

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
        this.vectorLayer = new VectorLayer({
            source: this.vectorSource,
            style: feature => {
                return new Style({
                    stroke: new Stroke({
                        color: 'blue',
                        width: 1
                    }),
                    fill: new Fill({
                        color: 'rgba(0, 0, 255, 0.1)'
                    }),
                    text: new Text({
                        font: '12px Calibri,sans-serif',
                        overflow: true,
                        fill: new Fill({
                            color: '#000'
                        }),
                        stroke: new Stroke({
                            color: '#fff',
                            width: 3
                        }),
                        text: feature.get('name')
                    })
                })
            }
        })

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

        if (this.mode === 'WRITE') {
            let draw = new (Draw as any)({
                source: this.vectorSource,
                type: 'Circle',
                geometryFunction: (Draw as any).createBox(),
            })
            draw.on('drawend', (e: any) => {
                let bbox = e.feature.getGeometry().getExtent();
                bbox = (proj as any).transformExtent(bbox, 'EPSG:3857', 'EPSG:4326')
                this.regions.push(bbox);
                this.onRegionsChange.emit(this.regions);
            })
            this.map.addInteraction(draw);
        }
        else {
            // var selectedStyle = new Style({
            //     stroke: new Stroke({
            //         color: [0, 153, 255, 1],
            //         width: 2.5
            //     }),
            //     fill: new Fill({ color: [255, 255, 255, 0.5] })
            // })
            // var highlightedFeatures = [];
            // this.map.on('pointermove', e => {
            //     for (let i = 0; i < highlightedFeatures.length; i++) {
            //         highlightedFeatures[i].setStyle(null);
            //     }
            //     highlightedFeatures = [];
            //     this.map.forEachFeatureAtPixel(e.pixel, feature => {
            //         feature.setStyle(selectedStyle);
            //         highlightedFeatures.push(feature);
            //     });
            // })
            this.regions.map((region, i) => {
                let bbox = (proj as any).transformExtent(region, 'EPSG:4326', 'EPSG:3857')
                let geometry = (Polygon as any).fromExtent(bbox)
                let feature = new Feature(geometry);
                feature.set('name', `R${i+1}`)
                this.vectorSource.addFeature(feature);
            })
            // this.vectorLayer.setStyle((feature, resolution) => {

            // })
            // let selectInteraction = new Select({
            //     condition: (OlEventCondition as any).click
            // });
            // this.map.addInteraction(selectInteraction);
            // selectInteraction.on('select', e => {

            // });
        }

        this.resize();
    }

    @HostListener('window:resize')
    resize() {
        this.map.updateSize();
    }
}
