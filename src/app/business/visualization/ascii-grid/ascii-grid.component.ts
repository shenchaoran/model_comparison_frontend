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
import { OlMapService } from '@common/feature/ol-map/ol-map.module';
import { CmpState } from '@models';
declare const ol: any;

@Component({
    selector: 'ogms-ascii-grid',
    templateUrl: './ascii-grid.component.html',
    styleUrls: ['./ascii-grid.component.scss']
})
export class AsciiGridComponent implements OnInit, AfterViewInit, OnChanges {
    targetId;
    map;
    layerGroup;

    @Input() imageLayers;
    constructor(private olMapService: OlMapService) {
        this.targetId = uuidv1();
    }

    ngOnInit() {}

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        const layerChange = changes['imageLayers'];
        if (layerChange) {
            if (!_.isEqual(layerChange.currentValue, layerChange.previousValue)) {
                if(this.map !== undefined) {
                    const layerGroup = this.map.getLayerGroup();
                    console.log(layerGroup);
                    this.layerGroup = layerGroup.getLayers().getArray()[0];
                    this.layerGroup.getLayers().clear();

                    this.layerGroup.getLayers().push(new ol.layer.Tile({
                        title: 'OSM',
                        visible: true,
                        source: new ol.source.OSM()
                    }));
                    this.addLayers();
                }
            }
        }
    }

    ngAfterViewInit() {
        // setTimeout(() => {
            // console.log(this.imageLayers);
            console.log(jQuery(`#${this.targetId}`).length);

            this.layerGroup = new ol.layer.Group({
                title: 'Layers',
                layers: [
                    new ol.layer.Tile({
                        title: 'OSM',
                        visible: true,
                        source: new ol.source.OSM()
                    })
                ]
            });
            this.map = new ol.Map({
                target: this.targetId,
                layers: [this.layerGroup],
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

            if (this.imageLayers && this.imageLayers.length) {
                this.addLayers();
            }
            const layerSwitcher = new ol.control.LayerSwitcher({
                tipLabel: 'LayerSwitcher'
            });
            this.map.addControl(layerSwitcher);
        // }, 10);
    }

    private addLayers() {
        const extents = [];
        let extent;
        _.map(this.imageLayers, imgLayer => {
            if (imgLayer.state === CmpState.FINISHED_SUCCEED) {
                this.layerGroup.getLayers().push(
                    new ol.layer.Image({
                        title: imgLayer.title,
                        source: new ol.source.ImageStatic({
                            ratio: 1,
                            params: {},
                            url: imgLayer.path,
                            imageExtent: imgLayer.extent,
                            projection: 'EPSG:3857'
                        })
                    })
                );
                extents.push(imgLayer.extent);
            }
        });
        extent = this.olMapService.getMapExtent(extents);

        this.map.getView().fit(extent, this.map.getSize());
    }
}
