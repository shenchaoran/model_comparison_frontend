// 异步函数全部返回Observable

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as uuidv1 from 'uuid/v1';
import { _HttpClient } from '@core/services/http.client';
import * as echarts from 'echarts';
import { OL_MAP_DRAW_TYPE } from '../models';
import { ErrorHandle } from '@core/base/error-handle';
import { OLSymbolService } from './ol-symbol.service';

// import * as ol from 'openlayers';
// import { Button, TextButton } from 'ol3-ext';
// 在angular.cli.json中添加过的script相当于添加到全局变量中了，这里声明一下通过编译器就行了

export abstract class MapService extends ErrorHandle {
    _map: any;
    _mapId: string;


    // maps map
    protected _maps: { [id: string]: any } = {};
    protected selectedMapId;

    // 画的 point, polyline, polygon
    draw: any;

    constructor(protected http: _HttpClient) {
        super();
    }

    // region maps db
    get maps() {
        return this._maps;
    }

    get selectedMap(): any {
        // return _.find(this.maps, map => map.id === this.selectedMapId);
        return this.maps[this.selectedMapId];
    }

    upsertMap(id: string, map: any): string {
        _.set(this.maps, id, map);
        const oldId = _.cloneDeep(this.selectedMapId);
        this.selectedMapId = id;
        return oldId;
    }

    deleteMap(id: string): any {
        const oldMap = _.cloneDeep(this.maps[id]);
        _.unset(this.maps, id);
        if(this.selectedMapId === id) {
            this.selectedMapId = undefined;
        }
        return oldMap;
    }

    findMap(id: string): any {
        return this.maps[id];
    }

    // setSelectedMap(id: string): boolean {
    //     if (this.maps[id] !== undefined) {
    //         this._selectedMapId = id;
    //         return true;
    //     } else {
    //         this._selectedMapId = undefined;
    //         return false;
    //     }
    // }

    // addAndSelectMap(id: string, map: any) {
    //     this.upsertMap(id, map);
    //     this.setSelectedMap(id);
    // }
    
    // endregion

    // region toolbar
    abstract pan();
    abstract zoomIn();
    abstract zoomOut();
    abstract fullExtent();
    abstract measureLength();
    abstract measureArea();
    abstract drawPoint();
    abstract drawLine();
    abstract drawPolygon();
    abstract clearDraw();
    abstract selectByCircle();
    abstract selectByRectangle();
    abstract selectByPolygon();
    // endregion

    // region

    // endregion
}
