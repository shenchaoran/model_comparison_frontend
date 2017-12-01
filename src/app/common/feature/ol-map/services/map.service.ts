// 异步函数全部返回Observable

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as uuidv1 from 'uuid/v1';

import * as ol from 'openlayers';
// import { Button, TextButton } from 'ol3-ext';
import * as echarts from 'echarts';




import { ErrorHandle } from '@core/base/error-handle';


export abstract class MapService extends ErrorHandle {
    
    constructor(protected http: HttpClient){
        super();
    }

    // maps map
    protected _maps: {[id: string]: any} = {};
    protected _selectedMapId;

    get maps() {
        return this._maps;
    }

    get selectedMapId() {
        return this._selectedMapId;
    }
    
    get selectedMap(): any {
        return _.find(this.maps, map => map.id === this.selectedMapId);
    }

    upsertMap(id: string, map: any) {
        _.set(this.maps, id, map);
    }

    deleteMap(id: string): any {
        return _.remove(this.maps, map => map.id === id);
    }

    findMap(id: string): any {
        return _.find(this.maps, map => map.id === id);
    }

    setSelectedMap(id: string): boolean {
        if(_.find(this.maps, map => map.id === id)) {
            this._selectedMapId = id;
            return true;
        }
        else {
            return false;
        }
    }

    addAndSelectMap(id: string, map: any) {
        this.upsertMap(id, map);
        this.setSelectedMap(id);
    }

    // toolbar 
    abstract zoomIn();                                               // 放大
    abstract zoomOut();                                              // 缩小
    abstract fullExtent();                                           // 缩放至全图
    abstract measureLength();                                        // 测距
    abstract measureArea();                                          // 测面积
    abstract drawPoint();                                            // 绘点
    abstract drawLine();                                             // 绘线
    abstract drawPolygon();                                          // 绘面
    abstract clearDraw();                                            // 清空绘制
    abstract selectByCircle();
    abstract selectByRectangle();
    
    // 
    public createMap(domId: string) {
        const map = new ol.Map({
            target: domId,
            controls: [new ol.control.ScaleLine()]
        });
        const guid = uuidv1();
        this.addAndSelectMap(guid, map);
        return guid;
    }

    public loadDefaultTileLayer() {
        this.selectedMap.addLayer(new ol.layer.Tile({
            source: new ol.source.OSM()
        }));
    }
    
    public createDefaultMap(domId: string) {
        const map = new ol.Map({
            target: domId,
            controls: [new ol.control.ScaleLine()]
        });
        const guid = uuidv1();
        this.addAndSelectMap(guid, map);

        this.loadDefaultTileLayer();
        this.setDefaultView();

        // let save = new ol.control.Button (
        //     {	html: '<i class="fa fa-download"></i>',
        //         className: "save",
        //         title: "Save",
        //         handleClick: function() {	
        //             // info("Center: "+map.getView().getCenter()+" - zoom: "+map.getView().getZoom());
        //         }
        //     });
        // this.selectedMap.addControl(save);
        return guid;
    }

    public loadDefaultImageLayer() {

    };

    public loadDefaultVectorLayer() {

    };

    public loadTileLayer() {

    };

    public loadImageLayer() {

    };

    public loadVectorLayer() {

    };


    
    public setDefaultView() {
        this.selectedMap.setView(
            new ol.View({
                center: [0, 0],
                zoom: 2
            })
        );
    }

    //
    public mapResize() {
        this.selectedMap.updateSize();
    };
}   