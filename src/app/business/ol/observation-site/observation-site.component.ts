import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, HostListener, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as uuidv1 from 'uuid/v1';
import { API } from '@config';
import { ObsSite } from '@models';
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
  selector: 'ogms-observation-site',
  templateUrl: './observation-site.component.html',
  styleUrls: ['./observation-site.component.scss']
})
export class ObservationSiteComponent implements OnInit, AfterViewInit {
    @Input() couldSelect: boolean = true;
    @Output() onSitesChange = new EventEmitter<{
        value?: any,
        valid: boolean,
    }>();

    layerId = 'Carbon_Cycle:obs-site';
    targetId;
    map;
    baseLayerGroup;
    siteLayer;
    siteSource;

    highlightSource;
    highlightLayer;

    sites: ObsSite[] = [];

    constructor(
        private olService: OlService,
        private http: HttpClient,
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
        this.siteSource = new TileWMS({
            crossOrigin: 'anonymous',
            serverType: 'geoserver',
            url: this.layers.url,
            params: {
                // request : 'GetMap',
                // service : 'WMS',
                // version : '1.1.0',
                layers: this.layerId,
                styles: '',
                bbox: this.layers.bbox,
                // 加长宽会变形
                // width : '768',
                // height : '330',
                srs: 'EPSG:4326'
                // 加下面的不允许跨域
                // format : 'application/openlayers'
            }
        });
        this.siteLayer = new Tile({
            title: 'Site',
            source: this.siteSource
        } as any);
        this.highlightSource = new VectorSource();
        this.highlightLayer = new VectorLayer({
            title: 'highlight features',
            source: this.highlightSource,
            style: new Style({
                image: new Circle({
                    radius: 4,
                    fill: new Fill({
                        color: [0, 0, 255, 1]
                    })
                }),
            })
        })

        let view = new View({
            center: [0, 0],
            zoom: 1
        });
        this.map = new Map({
            target: this.targetId,
            layers: [
                this.baseLayerGroup,
                this.siteLayer,
                this.highlightLayer,
            ],
            view: view,
            controls: new defaultControls({
                // attribution: false,
                rotate: false,
                zoom: false
            }).extend([new FullScreen(), new ScaleLine()])
        } as any);

        // let draw = new Draw.default({
        //     source: this.highlightSource,
        //     type: 'Point',
        // })
        // this.map.addInteraction(draw);

        if(!this.couldSelect)
            return;
        this.map.on('singleclick', evt => {
            let url = this.siteSource.getGetFeatureInfoUrl(
                evt.coordinate,
                view.getResolution(),
                'EPSG:3857',
                {
                    INFO_FORMAT: 'text/html',   //geoserver支持jsonp才能输出为jsonp的格式
                    QUERY_LAYERS: this.layerId,
                    // FEATURE_COUNT: 1     //点击查询能返回的数量上限
                    // format_options: ()
                }
            );
            if (url) {
                
                this.http.get(url).subscribe(res => {
                    try {
                        // TODO popup
                        console.log('selected site index: ' + JSON.stringify(res[0]));
                        let site = res[0];
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
                        if(siteId !== -1) {
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

                        if(this.sites.length) {
                            this.onSitesChange.emit({
                                valid: true,
                                value: this.sites
                            });
                        }
                        else {
                            this.onSitesChange.emit({ valid: false });
                        }
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
                return layer.get('title') === 'Site';
            });
            this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        })

        this.resize();
    }

    @HostListener('window:resize')
    resize() {
        this.map.updateSize();
    }
}
