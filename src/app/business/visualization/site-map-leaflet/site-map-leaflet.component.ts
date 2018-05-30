import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewInit,
} from '@angular/core';
import { MapBaseComponent } from '@shared';
import { MetDataService } from '../../datasets/services/met-data.service';
import * as proj4x from 'proj4';
declare const ol: any;
const proj4 = (proj4x as any).default;
import geojsonvt from 'geojson-vt';
import * as uuidv1 from 'uuid/v1';

@Component({
    selector: 'ogms-site-map-leaflet',
    templateUrl: './site-map-leaflet.component.html',
    styleUrls: ['./site-map-leaflet.component.scss']
})
export class SiteMapLeafletComponent implements OnInit, AfterViewInit {
    map;
    targetId;
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
        this.targetId = uuidv1();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        setTimeout(() => {
            let v = $('#' + this.targetId).length;
            console.log(v);
            if (v) {
                this.map = L.map(this.targetId).setView([0, 0], 1);

                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    maxZoom: 18,
                    attribution: '',
                    id: 'mapbox.streets'
                }).addTo(this.map);

                this.metDataService.getSites()
                    .subscribe(response => {
                        if (response) {
                            this.siteJSON = JSON.parse(response);
                            this.addSiteMap();
                        }
                    })

            }
        }, 100);
    }

    addSiteMap() {

        // L.TileLayer.Canvas.GeoJSON = L.TileLayer.Canvas.extend({
        //     options: {
        //         async: false
        //     },

        //     initialize: function (geojson, options) {
        //         L.setOptions(this, options);
        //         L.TileLayer.Canvas.prototype.initialize.call(this, options);
        //         this.drawGeoJSON(geojson);
        //     },

        //     drawGeoJSON: function (geojson) {
        //         var tileIndex = geojsonvt(geojson, this.options);
        //         this.drawTile = function (_canvas, tilePoint, zoom) {
        //             var ctx = _canvas.getContext('2d');
        //             var tile = tileIndex.getTile(zoom, tilePoint.x, tilePoint.y);
        //             var features = tile ? tile.features : [];
        //             for (var i = 0; i < features.length; i++) {
        //                 var feature = features[i];
        //                 this.drawFeature(ctx, feature);
        //             }
        //         };

        //     },

        //     drawFeature: function (ctx, feature) {
        //         var typeChanged = type !== feature.type,
        //             type = feature.type;
        //         ctx.beginPath();
        //         if (this.options.style) this.setStyle(ctx, this.options.style);
        //         if (type === 2 || type === 3) {
        //             for (var j = 0; j < feature.geometry.length; j++) {
        //                 var ring = feature.geometry[j];
        //                 for (var k = 0; k < ring.length; k++) {
        //                     var p = ring[k];
        //                     if (k) ctx.lineTo(p[0] / 16.0, p[1] / 16.0);
        //                     else ctx.moveTo(p[0] / 16.0, p[1] / 16.0);
        //                 }
        //             }
        //         } else if (type === 1) {
        //             for (var j = 0; j < feature.geometry.length; j++) {
        //                 var p = feature.geometry[j];
        //                 ctx.arc(p[0] / 16.0, p[1] / 16.0, 2, 0, Math.PI * 2, true);
        //             }
        //         }
        //         if (type === 3) ctx.fill('evenodd');

        //         ctx.stroke();
        //     },

        //     setStyle: function (ctx, style) {
        //         ctx.lineWidth = style.weight || {};
        //         ctx.strokeStyle = style.color || {};
        //         ctx.fillStyle = style.fillColor || {};
        //     }
        // });
        let opts = {
            maxZoom: 14,  // max zoom to preserve detail on; can't be higher than 24
            tolerance: 3, // simplification tolerance (higher means simpler)
            extent: 4096, // tile extent (both width and height)
            buffer: 64,	  // tile buffer on each side
            debug: 0,      // logging level (0 to disable, 1 or 2)
            lineMetrics: false,  // whether to enable line metrics tracking for LineString/MultiLineString features
            indexMaxZoom: 5,       // max zoom in the initial tile index
            indexMaxPoints: 100000 // max number of points per tile in the index
        };
        // let layer = new L.TileLayer.Canvas.GeoJSON(this.siteJSON, opts);
        // layer.addTo(this.map);
        // L.geoJSON(this.siteJSON).addTo(this.map);
    }
}
