import { feature } from './../../mock/issue.model';
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { GEOSERVER } from '@config'
import { OlService } from '../services/ol.service'
declare const ol: any;

@Component({
    selector: 'ogms-global-site',
    templateUrl: './global-site.component.html',
    styleUrls: ['./global-site.component.scss']
})
export class GlobalSiteComponent implements OnInit, AfterViewInit {
    @Input() width = '850px';
    @Input() height = '550px';
    @Input() selectedSite;
    @Output() onSiteSelected = new EventEmitter<any>();

    targetId
    map
    baseLayerGroup
    siteLayer
    siteSource

    constructor(private olService: OlService) {
        this.targetId = uuidv1()
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            let v = $('#' + this.targetId).length;
            console.log(v);
            if (v) {
                this.baseLayerGroup = new ol.layer.Group({
                    title: 'Base',
                    layers: [
                        new ol.layer.Tile({
                            title: 'OSM',
                            visible: true,
                            source: new ol.source.OSM()
                        })
                    ]
                });
                this.siteSource = new ol.source.TileWMS({
                    crossOrigin: 'anonymous',
                    serverType: 'geoserver',
                    url: `http://${GEOSERVER.host}:${GEOSERVER.port}${GEOSERVER.API_prefix}/geoserver/Carbon_Cycle/wms`,
                    params: {
                        // request : 'GetMap',
                        // service : 'WMS',
                        // version : '1.1.0',
                        layers: 'Carbon_Cycle:IBIS_site',
                        styles: '',
                        bbox: [-179.75,-54.75,179.75,82.25],
                        // 加长宽会变形
                        // width : '768',
                        // height : '330',
                        srs : 'EPSG:4326'
                        // 加下面的不允许跨域
                        // format : 'application/openlayers'
                    }
                })
                this.siteLayer = new ol.layer.Tile({
                    title: 'Site',
                    source: this.siteSource
                })

                let view = new ol.View({
                    center: [0, 0],
                    zoom: 2
                })
                this.map = new ol.Map({
                    target: this.targetId,
                    layers: [
                        this.baseLayerGroup,
                        this.siteLayer
                    ],
                    view: view,
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

                this.map.on('singleclick', evt => {
                    let url = this.siteSource.getGetFeatureInfoUrl(
                        evt.coordinate, 
                        view.getResolution(),
                        'EPSG:3857',
                        {
                            INFO_FORMAT: 'text/html',   //geoserver支持jsonp才能输出为jsonp的格式
                            QUERY_LAYERS: 'Carbon_Cycle:IBIS_site'
                            // FEATURE_COUNT: 1     //点击查询能返回的数量上限
                            // format_options: ()
                        }
                    )
                    if(url) {
                        this.olService.getFeatureInfo(url)
                            .subscribe(response => {
                                console.log('selected site index: ' + response[0].index)
                                this.onSiteSelected.emit(response[0].index)
                            })
                    }
                })
                this.map.on('pointermove', evt => {
                    if(evt.dragging) 
                        return
                    var pixel = this.map.getEventPixel(evt.originalEvent)
                    var hit = this.map.forEachLayerAtPixel(pixel, layer => {
                        return layer.get('title') === 'Site'
                    })
                    this.map.getTargetElement().style.cursor = hit? 'pointer': ''
                })
            }
        }, 0);
    }
}
