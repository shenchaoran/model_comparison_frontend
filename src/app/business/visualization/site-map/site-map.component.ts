import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { MapBaseComponent } from '@shared';
import { MetDataService } from '../../datasets/services/met-data.service';
import * as proj4x from 'proj4';
declare const ol: any;
const proj4 = (proj4x as any).default;
import geojsonvt from 'geojson-vt';

@Component({
    selector: 'ogms-site-map',
    templateUrl: './site-map.component.html',
    styleUrls: ['./site-map.component.scss']
})
export class SiteMapComponent extends MapBaseComponent implements OnInit {
    siteJSON;
    // sites;
    @Input() width = '850px';
    @Input() height = '550px';
    @Input() selectedSite;
    @Output() onSiteSelected = new EventEmitter<any>();
    siteLayer;

    constructor(
        private metDataService: MetDataService,
    ) {
        super();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this._subscriptions.push(
            this.observable.subscribe(() => {
                this._subscriptions.push(
                    this.metDataService.getSites()
                        .subscribe(response => {
                            if (response) {
                                this.siteJSON = JSON.parse(response);
                                this.addSiteMap();
                            }
                        })
                );
            })
        );
    }

    addSiteMap() {
        // let style = new ol.style.Style({
        //     image: new ol.style.Circle({
        //         stroke: new ol.style.Stroke({
        //             color: '#84aeef',
        //             width: 1
        //         }),
        //         fill: new ol.style.Fill({
        //             color: 'white'
        //         }),
        //         radius: 5
        //     })
        // });
        // let coors = [];
        // let features = [];
        // _.map(this.sites, site => {
        //     let coor = proj4('EPSG:3857').forward([site.x, site.y]);
        //     // coors.push(coors);
        //     let feat = new ol.Feature({
        //         geometry: new ol.geom.Point(coor),
        //         id: site.index,
        //         style: style
        //     });
        //     features.push(feat);
        // });
        // this.siteLayer = new ol.layer.Vector({
        //     title: 'Observation site',
        //     source: new ol.source.Vector({
        //         features: features
        //     })
        // });
        // this.map.addLayer(this.siteLayer);
        let replacer = function (key, value) {
            if (value.geometry) {
                var type;
                var rawType = value.type;
                var geometry = value.geometry;

                if (rawType === 1) {
                    type = 'MultiPoint';
                    if (geometry.length == 1) {
                        type = 'Point';
                        geometry = geometry[0];
                    }
                } else if (rawType === 2) {
                    type = 'MultiLineString';
                    if (geometry.length == 1) {
                        type = 'LineString';
                        geometry = geometry[0];
                    }
                } else if (rawType === 3) {
                    type = 'Polygon';
                    if (geometry.length > 1) {
                        type = 'MultiPolygon';
                        geometry = [geometry];
                    }
                }

                return {
                    'type': 'Feature',
                    'geometry': {
                        'type': type,
                        'coordinates': geometry
                    },
                    'properties': value.tags
                };
            } else {
                return value;
            }
        };
        var tilePixels = new ol.proj.Projection({
            code: 'TILE_PIXELS',
            units: 'tile-pixels'
        });
        let tileIndex = geojsonvt(this.siteJSON, {
            tolerance: 24,
            extent: 4096,
            debug: 1,
            buffer: 32,
            // indexMaxZoom: 5,
            indexMaxPoints: 5000
        });
        var vectorSource = new ol.source.VectorTile({
            format: new ol.format.GeoJSON(),
            tileLoadFunction: function (tile) {
                var format = tile.getFormat();
                var tileCoord = tile.getTileCoord();
                var data = tileIndex.getTile(tileCoord[0], tileCoord[1], -tileCoord[2] - 1);

                var features = format.readFeatures(
                    JSON.stringify({
                        type: 'FeatureCollection',
                        features: data ? data.features : []
                    }, replacer));
                tile.setLoader(function () {
                    tile.setFeatures(features);
                    tile.setProjection(tilePixels);
                });
            },
            url: 'data:' // arbitrary url, we don't use it in the tileLoadFunction
        });
        var vectorLayer = new ol.layer.VectorTile({
            source: vectorSource
        });
        this.map.addLayer(vectorLayer);
        // this.map.getView().fit(vectorSource.getExtent(), this.map.getSize());
        // this.siteLayer.getSource().addFeature(new ol.Feature(new ol.geom.MultiPoint(coors)));

        let selectIA = new ol.interaction.Select({
            layers: [vectorLayer],
            condition: (mapBrowserEvent) => {
                return ol.events.condition.click(mapBrowserEvent)
                // && ol.events.condition.altKeyOnly(mapBrowserEvent);
            }
        });
        this.map.addInteraction(selectIA);
        selectIA.on('select', (e) => {
            if (!e.deselected.length) {
                e.target.getFeatures().getArray().every(feature => {
                    this.onSiteSelected.emit(feature.get('index'));
                    // this.getSiteData('-s', feature.get('id'));    
                });
            }
        });
    }
}
