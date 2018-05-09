import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    OnChanges,
    SimpleChange,
    Output,
    EventEmitter,
} from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { OlMapService } from '@feature/ol-map/ol-map.module.ts';
import { GeoJSONService } from '@feature/ol-map/services/geojson.service';
declare var ol: any;

@Component({
    selector: 'ogms-draw-feature',
    templateUrl: './draw-feature.component.html',
    styleUrls: ['./draw-feature.component.scss']
})
export class DrawFeatureComponent implements OnInit, AfterViewInit {
    targetId;
    map;

    @Input() featureType;
    @Output() onDrawFinished = new EventEmitter<any>();

    constructor(private olMapService: OlMapService) {
        this.targetId = uuidv1();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (jQuery(`#${this.targetId}`).length) {
                this.map = this.olMapService.createMap(this.targetId);
                const layerSwitcher = new ol.control.LayerSwitcher({
                    tipLabel: 'LayerSwitcher'
                });
                this.map.addControl(layerSwitcher);
                const mainBar = new ol.control.Bar();
                this.map.addControl(mainBar);

                let icon, title;
                if(this.featureType === 'point') {
                    icon = '<i class="fa fa-map-marker" ></i>';
                    title = 'Point';
                }
                else if(this.featureType === 'polyline') {
                    icon = '';
                    title = 'Polyline';
                }
                else if(this.featureType === 'polygon') {
                    icon = '<i class="fa fa-bookmark-o fa-rotate-270" ></i>';
                    title = 'Polygon';
                }

                const inter = new ol.interaction.Draw({
                    type: title,
                    source: this.olMapService.getLayer('draw-point').getSource()
                });
                inter.on('drawend', (v) => {
                    this.onDrawFinished.emit(v)
                }, this);
                const editor = new ol.control.Toggle({
                    html: icon,
                    title: title,
                    interaction: inter
                });
                mainBar.addControl(editor);
            }
        }, 0);
    }
}
