import {
    Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef,
    Input, Output, EventEmitter, HostListener, Inject
} from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { MediaMatcher } from '@angular/cdk/layout';
import { API } from '@config';
import { ObsSite } from '@models';
import { TaskService } from '@services';
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
    selector: 'ogms-site-repl-app',
    templateUrl: './site-repl-app.component.html',
    styleUrls: ['./site-repl-app.component.scss']
})
export class SiteReplAppComponent implements OnInit, AfterViewInit {
    selectedTimeInterval = '8 days';
    timeIntervalOpts = {
        '1 year': '5c3c70613139ed0427000004',
        '1 day': '5c3be0f7896f318e14000053',
        '8 days': '5c3c87243139ed0427000030',
        '1 day with MODIS': '5c3f4bf02ba038eb47000012',
    }
    selectedMetric = 'GPP'
    metricLayerIds = {
        GPP: [
            {
                label: 'Biome-BGC-annual-output-GPP',
                value: 'Biome-BGC-annual-output-GPP'
            },
            {
                label: 'IBIS-annual-output-GPP',
                value: 'IBIS-annual-output-GPP'
            },
        ],
        NPP: [
            {
                label: 'Biome-BGC-annual-output-NPP',
                value: 'Biome-BGC-annual-output-NPP'
            },
            {
                label: 'IBIS-annual-output-NPP',
                value: 'IBIS-annual-output-NPP'
            },
        ],
        NEE: [
            {
                label: 'Biome-BGC-annual-output-NEE',
                value: 'Biome-BGC-annual-output-NEE'
            },
            {
                label: 'IBIS-annual-output-NEE',
                value: 'IBIS-annual-output-NEE'
            },
        ],
        NEP: [
            {
                label: 'Biome-BGC-annual-output-NEP',
                value: 'Biome-BGC-annual-output-NEP'
            },
        ],
    }
    siteLayerIds = [
        {
            label: 'grid-site',
            value: 'grid-site',
        },
        {
            label: 'obs-site',
            value: 'obs-site',
        },
    ]

    get slnIds() {
        return Object.keys(this.timeIntervalOpts);
    }
    get gridLayer() {
        return this.siteLayers.find(layer => {
            return layer.get('id') === 'grid-site'
        })
    }
    get obsLayer() {
        return this.siteLayers.find(layer => {
            return layer.get('id') === 'obs-site'
        })
    }
    get gridSource() {
        return this.gridLayer.get('source')
    }
    get obsSource() {
        return this.obsLayer.get('source')
    }
    get solutionId() {
        return this.timeIntervalOpts[this.selectedTimeInterval]
    }
    
    geoserverLayers
    siteLayers
    targetId;
    map;
    baseLayer;
    highlightSource;
    highlightLayer;

    sites: ObsSite[] = [];
    rightSideOpen: boolean = false;

    result;

    constructor(
        private olService: OlService,
        private taskService: TaskService,
        @Inject('GEOSERVER_LAYER_WS') private geoserverLayerWS,
        @Inject('API') public api,
    ) {
        this.targetId = uuidv1();
    }

    ngOnInit() { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.buildMap();
        }, 0);
    }

    onLayerChange(type: 'site' | 'global', v) {
        let theLayer
        this.map.getLayers().forEach(layer => {
            if(layer.get('id') === v.option.value) {
                theLayer = layer;
            }
        })
        if(theLayer)
            theLayer.setVisible(v.option.selected)
    }

    buildMap() {
        this.baseLayer = new Tile({
            title: 'OSM',
            visible: true,
            source: new OSM()
        } as any);

        this.geoserverLayers = (Object as any).values(this.metricLayerIds).flat().map(v => {
            let layerId = v.value
            return new Tile({
                id: layerId,
                source: new TileWMS({
                    crossOrigin: 'anonymous',
                    serverType: 'geoserver',
                    url: this.geoserverLayerWS.url,
                    params: {
                        layers: layerId,
                        styles: '',
                        bbox: this.geoserverLayerWS.bbox,
                        srs: 'EPSG:4326'
                    }
                })
            } as any)
        })

        this.siteLayers = this.siteLayerIds.map(v => {
            let layerId = v.value
            return new Tile({
                id: layerId,
                zindex: 10,
                source: new TileWMS({
                    crossOrigin: 'anonymous',
                    serverType: 'geoserver',
                    url: this.geoserverLayerWS.url,
                    params: {
                        layers: layerId,
                        styles: '',
                        bbox: this.geoserverLayerWS.bbox,
                        srs: 'EPSG:4326'
                    }
                })
            } as any)
        })

        this.highlightSource = new VectorSource();
        this.highlightLayer = new VectorLayer({
            title: 'highlight features',
            source: this.highlightSource,
            // style: new Style({
            //     image: new Circle({
            //         radius: 4,
            //         fill: new Fill({
            //             color: [0, 0, 255, 1]
            //         })
            //     }),
            // })
        })

        let view = new View({
            center: [0, 0],
            zoom: 1
        });
        this.map = new Map({
            target: this.targetId,
            layers: [
                this.baseLayer,
                ...this.siteLayers,
                ...this.geoserverLayers,
                this.highlightLayer,
            ],
            view: view,
            controls: new defaultControls({
                rotate: false,
                zoom: false
            }).extend([new ScaleLine()])
        } as any);
        
        this.map.on('singleclick', evt => {
            console.log(this.obsLayer.get('id'))
            let url = this.obsSource.getGetFeatureInfoUrl(
                evt.coordinate,
                view.getResolution(),
                'EPSG:3857',
                {
                    INFO_FORMAT: 'text/html',
                    QUERY_LAYERS: 'obs-site',
                }
            );
            if (url) {
                this.olService.getFeatureInfo(url).subscribe(response => {
                    try {
                        // TODO popup
                        console.log('selected site index: ' + JSON.stringify(response[0]));
                        let site = response[0];
                        let index = site.index;
                        site.long = parseFloat(site.long)
                        site.lat = parseFloat(site.lat)
                        let coor = [site.long, site.lat];
                        let xy = (proj as any).fromLonLat(coor, 'EPSG:3857')
                        let geom = new Point(xy)
                        let feature = new Feature({
                            id: site.id,
                            geometry: geom
                        })

                        let siteId = _.findIndex(this.sites, v => v.id === site.id)
                        if (siteId !== -1) {
                            this.sites.splice(siteId, 1)
                            this.highlightSource.getFeatures().map(feature => {
                                if (feature.get('id') === site.id) {
                                    this.highlightSource.removeFeature(feature);
                                }
                            })
                        }
                        else {
                            this.highlightSource.clear(true);
                            this.sites = [];
                            this.highlightSource.addFeature(feature);
                            this.sites.push(site)
                        }

                        this.rightSideOpen = true;
                        this.result = null;
                        this.taskService.getSTDResult(index, this.selectedMetric, this.timeIntervalOpts[this.selectedTimeInterval]).subscribe(res => {
                            if(!res.error) {
                                this.result = res.data
                            }
                        })
                    }
                    catch (e) {

                    }
                })
            }
        })
        this.map.on('pointermove', evt => {
            if (evt.dragging)
                return;
            var pixel = this.map.getEventPixel(evt.originalEvent);
            var hit = this.map.forEachLayerAtPixel(pixel, layer => {
                return layer.get('id') === 'obs-site';
            });
            this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        })

        this.geoserverLayers.map(layer => {
            layer.setVisible(false)
        })
        this.siteLayers.map(layer => {
            if(layer.get('id') !== 'obs-site')
                layer.setVisible(false)
            layer.setZIndex(10)
        })
        this.highlightLayer.setZIndex(20)

        this.resize();
    }

    @HostListener('window:resize')
    resize() {
        this.map.updateSize();
    }
}
