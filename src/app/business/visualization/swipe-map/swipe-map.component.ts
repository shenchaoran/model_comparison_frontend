import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    OnChanges,
    SimpleChange,
    ViewChild,
    ElementRef
} from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { setTimeout } from 'core-js/library/web/timers';
import { OlMapService } from '@common/feature/ol-map/ol-map.module';
import { CmpState } from '@models';
declare const ol: any;

@Component({
  selector: 'ogms-swipe-map',
  templateUrl: './swipe-map.component.html',
  styleUrls: ['./swipe-map.component.scss']
})
export class SwipeMapComponent implements OnInit, AfterViewInit {
    targetId;
    map;
    baseLayerGroup;
    cmpLayerGroup;
    swipeCtrl;
    @ViewChild('container') container: ElementRef;

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
                    const layers = this.map.getLayers().getArray();
                    _.map(layers, layer => {
                        if(layer.get('title') === 'Comparison') {
                            layer.getLayers().clear();
                        }
                    });
                    this.addLayers();
                }
            }
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            // console.log(this.imageLayers);
            console.log(this.container.nativeElement);
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
            this.cmpLayerGroup = new ol.layer.Group({
                title: 'Comparison',
                layers: []
            });
            this.map = new ol.Map({
                target: this.targetId,
                layers: [
                    this.baseLayerGroup,
                    this.cmpLayerGroup
                ],
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
        }, 10);
    }

    private addLayers() {
        const extents = [];
        let extent;
        
        if(!this.swipeCtrl) {
            this.swipeCtrl = new ol.control.Swipe();
            this.map.addControl(this.swipeCtrl);
        }
        let num = 0;
        _.map(this.imageLayers, (imgLayer, i) => {
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
                this.cmpLayerGroup.getLayers().push(layer);
                this.swipeCtrl.addLayer(layer, num===1? true: false);
                extents.push(imgLayer.extent);
                num++;
            }
        });

        

        extent = this.olMapService.getMapExtent(extents);
        this.map.getView().fit(extent, this.map.getSize());
    }

}
