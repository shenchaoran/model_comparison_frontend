import {
    Component,
    OnInit,
    Input,
    Output,
    HostListener,
    AfterViewInit,
    OnChanges,
    SimpleChange,
    ElementRef,
    ViewChild,
    Inject
} from '@angular/core';
import { OlMapService } from '@feature/ol-map/ol-map.module.ts';
import * as uuidv1 from 'uuid/v1';
declare var ol: any;
import { CmpState } from '@models';
import * as path from 'path';

@Component({
    selector: 'ogms-cmp-result-map',
    templateUrl: './cmp-result-map.component.html',
    styleUrls: ['./cmp-result-map.component.scss']
})
export class CmpResultMapComponent implements OnInit, OnChanges, AfterViewInit {
    targetId;
    map;

    cmpLayerGroup;
    baseLayerGroup;
    leftLayerGroup;
    rightLayerGroup;
    swipeCtrl;

    @Input() type: 'swipe' | 'default' = 'default';
    @Input() leftCfg: {
        label: string,
        layers: any[]
    };
    @Input() rightCfg: any;
    @Input() layerCfg: any;

    constructor(
        @Inject('BACKEND') private backend,
        private olMapService: OlMapService
    ) {
        this.targetId = uuidv1();
    }

    ngOnInit() {
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {

    }

    ngAfterViewInit() {
        // TODO 为何要放在事件队列里
        setTimeout(() => {
            // console.log(jQuery(`#${this.targetId}`).length);
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
            let layers = [this.baseLayerGroup];
            if (this.layerCfg) {
                this.cmpLayerGroup = new ol.layer.Group({
                    title: 'Simulation result',
                    layers: []
                });
                layers.push(this.cmpLayerGroup);
            }
            if (this.leftCfg) {
                this.leftLayerGroup = new ol.layer.Group({
                    title: this.leftCfg.label,
                    layers: []
                });
                layers.push(this.leftLayerGroup);
            }
            if (this.rightCfg) {
                this.rightLayerGroup = new ol.layer.Group({
                    title: this.rightCfg.label,
                    layers: []
                });
                layers.push(this.rightLayerGroup);
            }

            this.map = new ol.Map({
                target: this.targetId,
                layers: layers,
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

            this.addLayers();

            const layerSwitcher = new ol.control.LayerSwitcher({
                tipLabel: 'LayerSwitcher'
            });
            // TODO 禁止滚动冒泡
            this.map.addControl(layerSwitcher);
            // TODO 全屏
        }, 0);
    }

    addLayers() {
        if (this.leftCfg && this.rightCfg && this.type === 'swipe') {
            this.swipeCtrl = new ol.control.Swipe();
            this.map.addControl(this.swipeCtrl);
        }

        const extents = [];
        let extent;
        if (this.type === 'swipe') {
            if (this.leftCfg && this.leftCfg.layers && this.leftCfg.layers.length) {
                _.map(this.leftCfg.layers, (imgLayer, i) => {
                    if (imgLayer.state === CmpState.FINISHED_SUCCEED) {
                        const layer = new ol.layer.Image({
                            title: imgLayer.title,
                            source: new ol.source.ImageStatic({
                                ratio: 1,
                                params: {},
                                url: imgLayer.path,
                                imageExtent: imgLayer.extent,
                                projection: 'EPSG:3857'
                            })
                        });
                        this.leftLayerGroup.getLayers().push(layer);

                        // TODO 选择年份
                        // if(i === 0) {
                        this.swipeCtrl.addLayer(layer);
                        // }
                        extents.push(imgLayer.extent);
                    }
                });
            }
            if (this.rightCfg && this.rightCfg.layers && this.rightCfg.layers.length) {
                _.map(this.rightCfg.layers, (imgLayer, i) => {
                    if (imgLayer.state === CmpState.FINISHED_SUCCEED) {
                        const layer = new ol.layer.Image({
                            title: imgLayer.title,
                            source: new ol.source.ImageStatic({
                                ratio: 1,
                                params: {},
                                url: imgLayer.path,
                                imageExtent: imgLayer.extent,
                                projection: 'EPSG:3857'
                            })
                        });
                        this.rightLayerGroup.getLayers().push(layer);

                        // TODO 选择年份
                        // if(i === 0) {
                        this.swipeCtrl.addLayer(layer, true);
                        // }
                        extents.push(imgLayer.extent);
                    }
                });
            }
        }
        else {
            if (this.layerCfg && this.layerCfg.layers && this.layerCfg.layers.length) {
                _.map(this.layerCfg.layers, imgLayer => {
                    if (imgLayer.state === CmpState.FINISHED_SUCCEED) {
                        this.cmpLayerGroup.getLayers().push(
                            new ol.layer.Image({
                                title: imgLayer.title,
                                source: new ol.source.ImageStatic({
                                    ratio: 1,
                                    params: {},
                                    url: `http://${this.backend.host}:${this.backend.port}${imgLayer.path}`,
                                    imageExtent: imgLayer.extent,
                                    projection: 'EPSG:3857'
                                })
                            })
                        );
                        extents.push(imgLayer.extent);
                    }
                });
            }
        }
        extent = this.olMapService.getMapExtent(extents);

        this.map.getView().fit(extent, this.map.getSize());
    }

    onMouseWheel(e) {
        // console.log(e);
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
    }

    @HostListener('window:resize')
    resize() {
        this.map.updateSize();
    }
}
