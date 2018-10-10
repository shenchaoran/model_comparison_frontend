import { Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { OlMapService } from '@common/feature/ol-map/services/ol-map.service';
import { ToolbarService } from '@common/feature/ol-map/services/toolbar.service';

export class RegionMapService {
    olMapService;
    toolBarService;
    MAP_TOOLBAR_CONFIG;

    mode: 'read' | 'write';
    geojson: any;
    _mapId;

    // constructor(
    //     private olMapService: OlMapService, 
    //     private toolBarService: ToolbarService, 
    //     @Inject('MAP_TOOLBAR_CONFIG') @Optional() private MAP_TOOLBAR_CONFIG
    // ) {}
    
    init(mode) {
        this.mode = mode;
    }

    create(_targetId) {
        if(jQuery('#' + _targetId).length) {
            this._mapId = this.olMapService.createDefaultMap(_targetId);

            if(this.mode === 'read') {
                if(this.geojson) {
                    this.olMapService.addFeaturesByJSON(this.geojson);
                }
            }
            else if(this.mode === 'write') {
                this.toolBarService.init(this.olMapService, this.MAP_TOOLBAR_CONFIG);
            }
    
        }
        else {
            console.log('dom not prepared');
        }
    }

    afterDrawRect(): Observable<any> {
        return this.toolBarService.afterDrawRect();
    }
}