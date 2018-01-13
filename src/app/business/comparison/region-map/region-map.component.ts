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
import { OlMapService, ToolbarService } from '@feature/ol-map/ol-map.module';
import { GeoJSONService } from '@feature/ol-map/services/geojson.service'; 
import { Observable } from 'rxjs';
// declare var ol: any;
import * as ol from 'openlayers';

@Component({
    selector: 'ogms-region-map',
    templateUrl: './region-map.component.html',
    styleUrls: ['./region-map.component.scss'],
    providers: [OlMapService]
})
export class RegionMapComponent implements OnInit, AfterViewInit {
    @Input() imageStaticLayers: Array<any>;
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
        postal
            .channel('MAP_CHANNEL')
            .subscribe(`map.create.${this._mapId}`, (data, envelope) => {
                this.createMap();
            });
    }

    ngAfterViewInit() {
        this.createMap();
    }

    createMap() {
        if(this._mapId) {
            return;
        }

        if (jQuery('#' + this._targetId).length) {
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
}
