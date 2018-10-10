import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewInit,
    AfterViewChecked,
    HostListener,
    Inject,
    Optional
} from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { OlMapService, ToolbarService, GeoJSONService } from '@common/feature/ol-map/services';
import { Observable } from 'rxjs';
import * as ol from 'openlayers';

@Component({
    selector: 'ogms-region-map',
    templateUrl: './region-map.component.html',
    styleUrls: ['./region-map.component.scss'],
    providers: [OlMapService]
})
export class RegionMapComponent implements OnInit, AfterViewInit {
    @Input() mode: 'read' | 'write' = 'read';
    @Input() geojson: any = undefined;
    @Input() mapId: string;
    @Output() afterDrawRec = new EventEmitter<any>();

    _targetId: string;
    _mapId;

    constructor(
        private olMapService: OlMapService,
        private toolBarService: ToolbarService,
        @Inject('MAP_TOOLBAR_CONFIG')
        @Optional()
        private MAP_TOOLBAR_CONFIG
    ) {
        this._targetId = uuidv1();
    }

    ngOnInit() {
        // postal
        //     .channel('MAP_CHANNEL')
        //     .subscribe(`map.create.${this._mapId}`, (data, envelope) => {
        //         this.createMap();
        //     });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.createMap();
        }, 0);
    }

    createMap() {
        if(this._mapId) {
            return;
        }

        if (jQuery('#' + this._targetId).length) {
            // const map = new ol.Map({
            //     target: this._targetId,
            //     layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
            //     view: new ol.View({
            //         center: [0, 0],
            //         zoom: 2
            //     })
            // });

            this._mapId = this.olMapService.createDefaultMap(
                this._targetId,
                this.mapId
            );

            if (this.mode === 'read') {
                if (this.geojson) {
                    this.olMapService.addFeaturesByJSON(this.geojson);
                    const geojsonService = new GeoJSONService(this.geojson);
                    const imageExtent = geojsonService.getExtent();
                    this.olMapService.selectedMap.getView().fit(imageExtent, this.olMapService.selectedMap.getSize());
                }
            } else if (this.mode === 'write') {
                this.toolBarService.init(
                    this.olMapService,
                    this.MAP_TOOLBAR_CONFIG
                );
                this.toolBarService.afterDrawRect().subscribe(() => {
                    this.afterDrawRec.emit();
                });
            }

            this.resize();
            
            // postal
            //     .channel('MAP_CHANNEL')
            //     .publish('map.after-create-default', undefined);
        } else {
            console.log('dom not prepared');
        }
    }

    // afterDrawRec(): Observable<any> {
    //     return this.toolBarService.afterDrawRect();
    // }

    // re draw
    @HostListener('window:resize')
    resize() {
        this.olMapService.mapResize();
    }

    onMouseWheel(e) {
        // console.log(e);
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
    }
}
