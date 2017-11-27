import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MapServiceImpl } from '../map.service';
import { ESRI_MAP_DRAW_TYPE } from '../map.draw.type';
import { EsriSymbolService } from './esri.symbol.service';
import * as esriLoader from 'esri-loader';
import { ErrorHandle } from '@core/base/error-handle';

const Wkt = require('wicket/wicket.arcgis.js');


@Injectable()
export class ArcgisMapService extends MapServiceImpl {
    private subscriptions: Array<any>;
    private drawTool: any;
    private drawSubscription: Subscription;

    constructor(http: HttpClient, private esriSymbolService: EsriSymbolService) {
        super(http);

        this.subscriptions = new Array<any>();
    }

    subscribeTopics(){
        /** map tool bar */
        this.subscriptions.push(
            this.mapChannel.subscribe('map.fullExtent', (data, envelope) => {
                this.setInitExtent(this.map.id);

                // this.createHeatmapLayer('count').subscribe({
                //     next: (heatmapLayer) => {
                //         this.map.addLayer(heatmapLayer);

                //         this.heatmapLayerTest(heatmapLayer);
                //     }
                // });
                // this.clusterLayerTest();
            })
        );

        this.subscriptions.push(
            this.mapChannel.subscribe('map.zoomIn', (data, envelope) => {
                this.zoomIn();
            })
        );
        this.subscriptions.push(
            this.mapChannel.subscribe('map.zoomOut', (data, envelope) => {
                this.zoomOut();
            })
        );

        this.subscriptions.push(
            this.mapChannel.subscribe('map.pan', (data, envelope) => {
                this.map.setMapCursor('default');
                this.map.enablePan();

                if (this.drawTool !== undefined) {
                    this.drawTool.deactivate();
                }
            })
        );

        this.subscriptions.push(
            this.mapChannel.subscribe('map.measureLength', (data, envelope) => {
                this.measureLength();
            })
        );
        this.subscriptions.push(
            this.mapChannel.subscribe('map.measureArea', (data, envelope) => {
                this.measureArea();
            })
        );

        this.subscriptions.push(
            this.mapChannel.subscribe('map.centerAt', (data, envelope) => {
                this.mapCenterAt(data.pointX, data.pointY);
            })
        );

        this.subscriptions.push(
            this.mapChannel.subscribe('map.drawPoint', (data, envelope) => {
                if(this.drawSubscription){
                    this.drawSubscription.unsubscribe();
                }
                this.drawSubscription = this.drawGraphic(ESRI_MAP_DRAW_TYPE.POINT).subscribe({
                    next: (geometry) => {
                    }
                });
            })
        );
        this.subscriptions.push(
            this.mapChannel.subscribe('map.drawPolyline', (data, envelope) => {
                if(this.drawSubscription){
                    this.drawSubscription.unsubscribe();
                }
                this.drawSubscription = this.drawGraphic(ESRI_MAP_DRAW_TYPE.POLYLINE).subscribe({
                    next: (geometry) => {
                    }
                });
            })
        );
        this.subscriptions.push(
            this.mapChannel.subscribe('map.drawPolygon', (data, envelope) => {
                if(this.drawSubscription){
                    this.drawSubscription.unsubscribe();
                }
                this.drawSubscription = this.drawGraphic(ESRI_MAP_DRAW_TYPE.POLYGON).subscribe({
                    next: (geometry) => {

                    }
                });
            })
        );

        this.subscriptions.push(
            this.mapChannel.subscribe('map.selectCircle', (data, envelope) => {
                if(this.drawSubscription){
                    this.drawSubscription.unsubscribe();
                }
                this.drawGraphic(ESRI_MAP_DRAW_TYPE.CIRCLE).subscribe({
                    next: (geometry) => {
                        this.mapChannel.publish('map.selectCircle.callback', {
                            geometry: this.convertGeometry2Wkt(geometry)
                        });
                    }
                });
            })
        );
        this.subscriptions.push(
            this.mapChannel.subscribe('map.selectRectangle', (data, envelope) => {
                if(this.drawSubscription){
                    this.drawSubscription.unsubscribe();
                }
                this.drawGraphic(ESRI_MAP_DRAW_TYPE.RECTANGLE).subscribe({
                    next: (geometry) => {
                        this.mapChannel.publish('map.selectRectangle.callback', {
                            geometry: this.convertGeometry2Wkt(geometry)
                        });
                    }
                });
            })
        );
        this.subscriptions.push(
            this.mapChannel.subscribe('map.selectPolygon', (data, envelope) => {
                if(this.drawSubscription){
                    this.drawSubscription.unsubscribe();
                }
                this.drawGraphic(ESRI_MAP_DRAW_TYPE.POLYGON).subscribe({
                    next: (geometry) => {
                        this.mapChannel.publish('map.selectPolygon.callback', {
                            geometry: this.convertGeometry2Wkt(geometry)
                        });
                    }
                });
            })
        );

        this.subscriptions.push(
            this.mapChannel.subscribe('layers.add', (data, envelope) => {
                let mapId = data.mapId;
                let layerAid = data.layerAid;

                this.loadMapLayer(layerAid, mapId);
            })
        );

        this.subscriptions.push(
            this.mapChannel.subscribe('layers.remove', (data, envelope) => {
                let mapId = data.mapId;
                let layerAid = data.layerAid;

                this.removeMapLayer(layerAid, mapId);
            })
        );
        this.subscriptions.push(
            this.mapChannel.subscribe('layers.removeAll', (data, envelope) => {
                let mapId = data.mapId;
                let theMap = this.getMap(mapId);

                while (theMap.layerIds.length > 1) {
                    let layerAid = theMap.layerIds[theMap.layerIds.length - 1];
                    this.removeMapLayer(layerAid, mapId);
                }
            })
        );
        this.subscriptions.push(
            this.mapChannel.subscribe('layer.moveLevel', (data, envelope) => {
                let mapId = data.mapId;
                let layerAid = data.layerAid;
                let level = data.level;

                this.moveLayerLevel(layerAid, level, mapId);
            })
        );
        this.subscriptions.push(
            this.mapChannel.subscribe('layer.setOpacity', (data, envelope) => {
                let mapId = data.mapId;
                let layerAid = data.layerAid;
                let opacity = data.opacity;

                this.setLayerOpacity(layerAid, opacity, mapId);
            })
        );

        this.subscriptions.push(
            this.mapChannel.subscribe('map.changeBaseMap', (data, envelope) => {
                let mapId = data.mapId;
                let layerAid = data.layerAid;

                this.changeBaseMap(layerAid, mapId, false);
            })
        );

        this.subscriptions.push(
            this.mapChannel.subscribe('map.mapClick', (data, envelope) => {
                let graphicsLayer = 'map-click-layer';
                this.clearLayerGraphics(graphicsLayer);

                this.getClickPoint();
            })
        );

        this.subscriptions.push(
            this.mapChannel.subscribe('map.clearGraphics', (data, envelope) => {
                this.clearGraphics();
            })
        );

        this.subscriptions.push(
            this.mapChannel.subscribe('map.showQueryResults', (data, envelope) => {
                this.showQueryResults(data.type, data.result);
            })
        );
    }

    unsubscribeTopics(){
        _.forEach(this.subscriptions, (topic)=>{
            postal.unsubscribe(topic);
        });
    }

    /** map */
    createMap(domNodeOrId: string): Observable<any> {
        return Observable.create((observer) => {
            esriLoader.dojoRequire(['esri/map', 'esri/SpatialReference', 'esri/dijit/Scalebar'], (Map, SpatialReference, Scalebar) => {
                let options = {
                    logo: false,
                    slider: false
                };
                this.map = new Map(domNodeOrId, options);

                let scalebar = new Scalebar({
                    map: this.map,
                    scalebarStyle: 'line',
                    scalebarUnit: 'dual'
                });

                //loadDefaultLayers后再执行？？？
                let mapOnLoad = this.map.on('load', () => {
                    this.setInitExtent(domNodeOrId);

                    this.intiDrawTool();
                });

                observer.complete();
            });
        });
    };

    createDoubleMap(domNodeOrId: any): Observable<any> {
        return Observable.create((observer) => {
            esriLoader.dojoRequire(['esri/map'], (Map) => {
                let options = {
                    logo: false,
                    slider: false
                };

                let theMap = new Map(domNodeOrId, options);
                this.maps[domNodeOrId] = theMap;

                let mapOnLoad = theMap.on('load', () => {
                    this.setInitExtent(domNodeOrId);
                });

                let mapMouseOver = theMap.on('mouse-over', (mouseEvent) => {
                    this.setFocusMap(theMap.id);
                });

                let mapMouseUp = theMap.on('mouse-up', (mouseEvent) => {
                    for (let mapId in this.maps) {
                        if (mapId !== this.focusMap) {
                            this.setMapExtent(theMap.extent, mapId);
                            break;
                        }
                    }
                });

                let mapZoomEnd = theMap.on('zoom-end', (event) => {
                    for (let mapId in this.maps) {
                        if (mapId !== this.focusMap) {
                            this.setMapExtent(event.extent, mapId);
                            break;
                        }
                    }
                });

                observer.complete();
            });
        });
    };

    setInitExtent(mapId: string) {
        let theMap = this.getMap(mapId);

        if (theMap.spatialReference.wkt.indexOf(this.mapConfig.mapinfo.spatialReference) !== -1) {

            let extentInfo = this.mapConfig.mapinfo.extent;

            this.setMapExtent(extentInfo, mapId);
        } else {
            postal.channel('MESSAGEBOX_CHANNEL').publish('show', {type: 'error', content: '图层坐标系不一致', duration: 3000});
        }
    }

    setMapExtent(extent: any, mapId: string) {
        esriLoader.dojoRequire(['esri/geometry/Extent'], (Extent) => {
            let theMap = this.getMap(mapId);

            theMap.setExtent(new Extent(extent.xmin, extent.ymin, extent.xmax, extent.ymax, theMap.spatialReference));
        });
    }


    zoomIn() {
        let currentZoom = this.map.getZoom();
        this.map.setZoom(currentZoom + 1);
    }

    zoomOut() {
        let currentZoom = this.map.getZoom();
        this.map.setZoom(currentZoom - 1);
    }

    mapCenterAt(pointX: number, pointY: number) {
        esriLoader.dojoRequire(['esri/geometry/Point'], (Point) => {
            let point = new Point(pointX, pointY, this.map.spatialReference);
            this.mapCenterAt2(point);
        });
    }

    mapCenterAndZoom(pointX: number, pointY: number, zoomLevel: number) {
        esriLoader.dojoRequire(['esri/geometry/Point'], (Point) => {
            let point = new Point(pointX, pointY, this.map.spatialReference);
            this.mapCenterAndZoom2(point, zoomLevel);
        });
    }

    mapCenterAt2(point: any) {
        this.map.centerAt(point);
    }

    mapCenterAndZoom2(point: any, zoomLevel: number) {
        this.map.centerAndZoom(point, zoomLevel);
    }

    measureLength() {
        esriLoader.dojoRequire(['esri/layers/GraphicsLayer',
            'esri/graphic',
            'esri/toolbars/draw',
            'esri/symbols/Font',
            'esri/Color',
            'esri/symbols/SimpleLineSymbol',
            'esri/geometry/geometryEngine',
            'esri/symbols/TextSymbol',
            'esri/geometry/Point'],
            (GraphicsLayer, Graphic, Draw, Font, Color, SimpleLineSymbol, geometryEngine, TextSymbol, Point) => {
                if (this.drawTool) {
                    this.drawTool.deactivate();
                }

                this.drawTool = new Draw(this.map);
                this.map.setMapCursor('crosshair');

                let handle = this.drawTool.on('draw-complete', (event) => {
                    handle.remove();

                    this.drawTool.deactivate();
                    this.map.setMapCursor('default');

                    this.esriSymbolService.getSymbol(event.geometry.type, 'measure_symbol').subscribe({
                        next: (symbol) => {
                            this.map.graphics.add(new Graphic(event.geometry, symbol));

                            let length = geometryEngine.planarLength(event.geometry, 'meters').toFixed(2);

                            let font = new Font('12px', Font.STYLE_NORMAL, Font.letIANT_NORMAL);
                            let textSymbol = new TextSymbol(length + '米', font, new Color([0, 0, 0]));

                            let lastPoint = event.geometry.paths[0][event.geometry.paths[0].length - 1];
                            let point = new Point(lastPoint[0], lastPoint[1], event.geometry.spatialReference);
                            let labelGraphic = new Graphic(point, textSymbol);

                            this.map.graphics.add(labelGraphic);
                        }
                    });
                });

                this.drawTool.activate(Draw.POLYLINE);
            });
    }

    measureArea() {
        esriLoader.dojoRequire(['esri/graphic',
            'esri/toolbars/draw',
            'esri/symbols/Font',
            'esri/Color',
            'esri/symbols/SimpleLineSymbol',
            'esri/geometry/geometryEngine',
            'esri/symbols/TextSymbol',
            'esri/symbols/SimpleFillSymbol'],
            (Graphic, Draw, Font, Color, SimpleLineSymbol, geometryEngine, TextSymbol, SimpleFillSymbol) => {
                if (this.drawTool) {
                    this.drawTool.deactivate();
                }

                this.drawTool = new Draw(this.map);
                this.map.setMapCursor('crosshair');

                let handle = this.drawTool.on('draw-complete', (event) => {
                    handle.remove();

                    this.drawTool.deactivate();
                    this.map.setMapCursor('default');

                    this.esriSymbolService.getSymbol(event.geometry.type, 'measure_symbol').subscribe({
                        next: (symbol) => {
                            this.map.graphics.add(new Graphic(event.geometry, symbol));

                            let area = geometryEngine.planarArea(event.geometry, 'square-meters').toFixed(2);

                            let font = new Font('12px', Font.STYLE_NORMAL, Font.letIANT_NORMAL);
                            let textSymbol = new TextSymbol(area + '平方米', font, new Color([0, 0, 0]));

                            let point = event.geometry.getCentroid();
                            let labelGraphic = new Graphic(point, textSymbol);

                            this.map.graphics.add(labelGraphic);
                        }
                    });
                });

                this.drawTool.activate(Draw.POLYGON);
            });
    }

    getClickPoint() {
        this.map.setMapCursor('help');

        let mapClickEvent = this.map.on('click', (e: any) => {
            mapClickEvent.remove();
            this.map.setMapCursor('default');

            let pointWkt = this.convertGeometry2Wkt(e.mapPoint);

            this.mapChannel.publish('map.mapClick.callback', {
                mapPoint: pointWkt
            });
        });

        // 解决map.popUp.component不执行ngOnInit，大致用途就是让dom重新渲染下
        this.map.resize();
    }

    private changeBaseMap(layerAid: string, mapId: string, deleteMap: boolean) {
        let theMap = this.getMap(mapId);

        if (deleteMap) {
            theMap.destroy();

            if (mapId === this.map.id) {
                this.createMap(mapId).subscribe({
                    next: null,
                    error: error => this.handleError(error),
                    complete: () => {
                        this.loadMapLayer(layerAid, mapId, 0);
                    }
                });
            } else {
                this.createDoubleMap(mapId).subscribe({
                    next: null,
                    error: error => this.handleError(error),
                    complete: () => {
                        this.loadMapLayer(layerAid, mapId, 0);
                    }
                });
            }
        } else {
            let baseLayerAid = theMap.layerIds[0];

            this.removeMapLayer(baseLayerAid, mapId);

            this.loadMapLayer(layerAid, mapId, 0);
        }
    }

    /** layers */
    loadTiledLayer(layerAid: string, layerInfo: any, mapId: string, index?: number) {
        let theMap = this.getMap(mapId);

        this.getTokenValue(layerInfo.tokenid).subscribe(token => {
            let layerUrl = layerInfo.url + '?token=' + encodeURIComponent(token);

            esriLoader.dojoRequire(['esri/layers/ArcGISTiledMapServiceLayer'], (ArcGISTiledMapServiceLayer) => {
                let layer = new ArcGISTiledMapServiceLayer(layerUrl, { id: layerAid });

                theMap.addLayer(layer, index);
            });
        });
    }

    loadDynamicLayer(layerAid: string, layerInfo: any, mapId: string, index?: number) {
        let theMap = this.getMap(mapId);

        this.getTokenValue(layerInfo.tokenid).subscribe(token => {
            let layerUrl = layerInfo.url + '?token=' + encodeURIComponent(token);

            esriLoader.dojoRequire(['esri/layers/ArcGISDynamicMapServiceLayer'], (ArcGISDynamicMapServiceLayer) => {
                let option = { id: layerAid };
                let dynamicLyr = new ArcGISDynamicMapServiceLayer(layerUrl, option);

                if (layerInfo.hasOwnProperty('vls')) {
                    dynamicLyr.setVisibleLayers(layerInfo.vls);
                }

                theMap.addLayer(dynamicLyr, index);
            });
        });
    }

    loadFeatureLayer(layerAid: string, layerInfo: any, mapId: string, index?: number) {

    }

    removeMapLayer(layerAid: string, mapId: string) {
        let theMap = this.getMap(mapId);
        let layer = theMap.getLayer(layerAid);
        theMap.removeLayer(layer);
    }

    moveLayerLevel(layerAid: string, level: string, mapId: string) {
        let theMap = this.getMap(mapId);
        let layer = theMap.getLayer(layerAid);

        if (layer !== undefined) {
            let index = -1;

            switch (level) {
                case '~+1':
                    index = theMap.layerIds.length - 1;
                    break;
                case '~-1':
                    index = 1;
                    break;
                case '+1':
                    index = _.indexOf(theMap.layerIds, layerAid) + 1;
                    break;
                case '-1':
                    index = _.indexOf(theMap.layerIds, layerAid) - 1;
                    break;
            }
            theMap.reorderLayer(layer, index);
        } else {
            //todo
            alert('未找到此图层');
        }
    }

    setLayerOpacity(layerAid: string, opacity: number, mapId: string) {
        let theMap = this.getMap(mapId);
        let layer = theMap.getLayer(layerAid);

        if (layer !== undefined) {
            layer.setOpacity(opacity)
            layer.refresh();
        } else {
            postal.channel('MESSAGEBOX_CHANNEL').publish('show', {type: 'error', content: '未找到此图层', duration: 3000});
        }

    }

    /** graphics */
    intiDrawTool(){
        esriLoader.dojoRequire(['esri/toolbars/draw'], (Draw) => {
            this.drawTool = new Draw(this.map);
        });
    }

    drawGraphic(type: ESRI_MAP_DRAW_TYPE): Observable<any> {
        return Observable.create((observer) => {
            esriLoader.dojoRequire(['esri/toolbars/draw'], (Draw) => {
                this.map.setMapCursor('crosshair');
                this.map.disableMapNavigation();

                this.drawTool.on('draw-complete', (event) => {
                    this.drawTool.deactivate();
                    this.map.setMapCursor('default');

                    this.addGeometryToMap(event.geometry, 'default_symbol');
                    this.map.enableMapNavigation();

                    observer.next(event.geometry);
                });

                this.drawTool.activate(Draw[type]);
            });
        });
    }

    addGeometryToMap(geometry: any, symbolName: string) {
        esriLoader.dojoRequire(['esri/graphic', 'esri/symbols/Symbol', 'esri/InfoTemplate'], (Graphic, Symbol, InfoTemplate) => {
            this.esriSymbolService.getSymbol(geometry.type, symbolName).subscribe({
                next: (symbol) => {
                    let graphic = new Graphic(geometry, symbol);

                    let theMap = this.getMap();
                    theMap.graphics.add(graphic);
                }
            });
        });
    }

    addWktGeoToMap(wktStr: string, symbolName: string) {
        let geometry = this.convertWkt2Geometry(wktStr);
        this.addGeometryToMap(geometry, symbolName);
    }


    addGeoToGraphicLyr(layerId: string, geometry: any, popContent: any, symbolName: string, symbolIndex?: number) {
        esriLoader.dojoRequire(['esri/graphic', 'esri/layers/GraphicsLayer', 'esri/symbols/Symbol'],
            (Graphic, GraphicsLayer, Symbol) => {
                this.esriSymbolService.getSymbol(geometry.type, symbolName, symbolIndex).subscribe({
                    next: (symbol) => {

                        let graphicLyr = this.map.getLayer(layerId);

                        if (typeof (graphicLyr) === 'undefined') {
                            graphicLyr = new GraphicsLayer({ id: layerId });
                            this.map.addLayer(graphicLyr);

                            graphicLyr.on('click', (event) => {
                                if(event.graphic.attributes !== undefined){
                                    let geometry = event.graphic.geometry;
                                    let popContent = event.graphic.attributes['popContent'];

                                    this.highlightGeometry(geometry, popContent);
                                    this.showMapPopUp(geometry, popContent, false);
                                }
                            });
                        }

                        let graphic = new Graphic(geometry, symbol);
                        if (popContent != null) {
                            graphic.setAttributes({ popContent: popContent });
                        }

                        graphicLyr.add(graphic);
                    }
                });
            });
    }

    private clearGraphics() {
        this.map.setMapCursor('default');
        this.map.infoWindow.hide();
        this.map.graphics.clear();

        let graphicsLyrIds = this.map.graphicsLayerIds;
        _.forEach(graphicsLyrIds, (graphicsLyrId) => {
            let graphicsLyr = this.map.getLayer(graphicsLyrId);
            graphicsLyr.clear();
        });

        if (this.drawTool) {
            this.drawTool.deactivate();
        }
    }

    private clearLayerGraphics(graphicsLayer) {
        this.map.infoWindow.hide();

        let graphicsLyr = this.map.getLayer(graphicsLayer);
        if (graphicsLyr !== undefined) {
            graphicsLyr.clear();
        }
    }

    private showQueryResults(layerName, data) {
        let layerId = layerName + '-layer';

        let geometryDid = (<any>_.find(data.dd, (dataDefinition: any) => {
            return (dataDefinition).dt.toLowerCase() === 'geometry';
        })).did;

        let dpks = _.filter(data.dd, (dataDefinition: any) => {
            return (dataDefinition).dpk === 'true' || (dataDefinition).dpk === true;
        });

        let popFooter: any = new Array<any>();
        _.forEach(data.linkmore, (item) => {
            _.forOwn(item, function (value, key) {
                popFooter.push({ key: key, value: value });
            });
        });

        _.forEach(data.dc, (item, index) => {
            let popContent: any = { popFooter: popFooter };
            let popId: any = new Object();
            let popTitle: any = new Array<any>();
            let popBody: any = new Array<any>();

            let popGeo: any;

            _.forEach(item, (keyVal) => {
                let key: string = keyVal.did;

                if (data.poptitle.value != '') {
                    if (!_.includes(popTitle, data.poptitle.value)) {
                        popTitle.push(data.poptitle.value);
                    }
                } else if (_.includes(data.poptitle.fields, key)) {
                    popTitle.push(keyVal.dv);
                }

                if (_.some(dpks, ['did', key])) {
                    popId[key] = keyVal.dv;
                }

                if (_.includes(data.poplist, key)) {
                    let dd: any = _.find(data.dd, (dataDefinition: any) => {
                        return (dataDefinition).did === key;
                    });

                    let popItem = this.createPopItem(dd, keyVal.dv);
                    popBody.push(popItem);

                } else if (key === geometryDid) {
                    popGeo = this.convertWkt2Geometry(keyVal.dv);
                }
            });

            popContent.popId = popId;
            popContent.popTitle = popTitle.join('-');
            popContent.popBody = popBody;

            //draw to map
            if (layerId === 'iQuery-layer') {
                // this.addGeoToGraphicLyr(layerId, popGeo, popContent, 'highlight_symbol');
            } else {
                this.addGeoToGraphicLyr(layerId, popGeo, popContent, 'index_picture_marker_symbol', parseInt(index) + 1);
            }

            if (parseInt(index) === 0) {
                this.highlightGeometry(popGeo, popContent);
                this.showMapPopUp(popGeo, popContent, true);
            }
        });
    }

    /** popUp */
    private createPopItem(dataDefinition, value) {
        let pop: any = new Object();
        pop.id = dataDefinition.did;
        pop.colTitle = dataDefinition.dct;
        pop.value = value + dataDefinition.du;

        return pop;
    }

    private showMapPopUp(popGeometry: any, popContent: any, zoom: boolean) {
        esriLoader.dojoRequire(['esri/geometry/Geometry', 'esri/geometry/Extent', 'esri/graphicsUtils'],
            (Geometry, Extent, graphicsUtils) => {
                let popGeoCenter = popGeometry;
                if (popGeometry.type === 'polygon' || popGeometry.type === 'polyline') {
                    popGeoCenter = popGeometry.getExtent().getCenter();
                }
                let screenPoint = this.map.toScreen(popGeoCenter);

                this.map.infoWindow.setTitle(popContent.popTitle);

                this.map.infoWindow.show(screenPoint, this.map.getInfoWindowAnchor(screenPoint));

                if (zoom) {
                    this.mapCenterAndZoom2(popGeoCenter, this.map.getMaxZoom() - 2);
                } else {
                    this.mapCenterAt2(popGeoCenter);
                }

                postal.channel('POPUP_CHANNEL').publish('popUp.show', { popContent: popContent });

                this.map.infoWindow.on('hide', () => {
                    this.clearHightlightGraphics();
                });
            });
    }

    /** hightlight */
    private highlightGeometry(geometry: any, popContent: any) {
        esriLoader.dojoRequire(['esri/graphic', 'esri/layers/GraphicsLayer', 'esri/symbols/Symbol'],
            (Graphic, GraphicsLayer, Symbol) => {
                let highlightGLyr = this.map.getLayer('highlightGLyr');
                if (typeof (highlightGLyr) === 'undefined') {
                    highlightGLyr = new GraphicsLayer({ id: 'highlightGLyr' });
                    this.map.addLayer(highlightGLyr);
                } else {
                    //放到最顶层
                    this.clearHightlightGraphics();
                    this.map.reorderLayer(highlightGLyr, 0);
                }

                this.addGeoToGraphicLyr('highlightGLyr', geometry, popContent, 'highlight_symbol');
            });
    }

    private clearHightlightGraphics() {
        let highlightGLyr = this.map.getLayer('highlightGLyr');
        if (highlightGLyr !== undefined) {
            highlightGLyr.clear();
        }
    }


    /** convert method */
    private convertWkt2Geojson(wktStr) {
        let wkt = new Wkt.Wkt();
        wkt.read(wktStr);

        return wkt.toJson();
    }

    private convertWkt2Geometry(wktStr) {
        let wkt = new Wkt.Wkt();
        wkt.read(wktStr);

        let config = {
            spatialReference: {
                wkt: this.map.spatialReference.wkt
            },
            editable: false
        };

        return wkt.toObject(config);
    }

    private convertGeometry2Wkt(geometry) {
        let wkt = new Wkt.Wkt();
        wkt.fromObject(geometry);

        return wkt.write();
    }






    clusterLayerTest() {
        this.http.get('./config/mock-shape-haiyu-data.json')
            // .map(data => data.json())
            .subscribe({
                next: data => {
                    // console.log(data);

                    let clusterData = _.map(data, (item) => {
                        let shape = this.convertWkt2Geometry(item.shape);

                        return {
                            'x': shape.x,
                            'y': shape.y,
                            'attributes': [item.ID, item.DLMC]
                        }
                    });


                    esriLoader.dojoRequire(['extras/ClusterLayer', 'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/PictureMarkerSymbol', 'esri/renderers/ClassBreaksRenderer'],
                        (ClusterLayer, SimpleMarkerSymbol, PictureMarkerSymbol, ClassBreaksRenderer) => {
                            let clusterLayer = new ClusterLayer({
                                'data': clusterData,
                                'distance': 100,
                                // 'id': 'clusters',
                                'labelColor': '#fff',
                                'labelOffset': 10,
                                'resolution': this.map.extent.getWidth() / this.map.width,
                                'showSingles': true,
                                'spatialReference': this.map.spatialReference
                            });

                            let defaultSym = new SimpleMarkerSymbol().setSize(4);
                            let renderer = new ClassBreaksRenderer(defaultSym, 'clusterCount');

                            let picBaseUrl = 'https://static.arcgis.com/images/Symbols/Shapes/';
                            let blue = new PictureMarkerSymbol(picBaseUrl + 'BluePin1LargeB.png', 32, 32).setOffset(0, 15);
                            let green = new PictureMarkerSymbol(picBaseUrl + 'GreenPin1LargeB.png', 64, 64).setOffset(0, 15);
                            let red = new PictureMarkerSymbol(picBaseUrl + 'RedPin1LargeB.png', 72, 72).setOffset(0, 15);
                            renderer.addBreak(0, 2, blue);
                            renderer.addBreak(2, 200, green);
                            renderer.addBreak(200, 1001, red);

                            clusterLayer.setRenderer(renderer);
                            this.map.addLayer(clusterLayer);
                        });
                }
            });
    }

    heatmapLayerTest(heatmapLayer) {
        esriLoader.dojoRequire(['esri/graphic'], (Graphic) => {
            this.http.get('./config/mock-heatmap-yuanqu-data.json')
                // .map(data => data.json())
                .subscribe({
                    next: datas => {
                        _.forEach(datas, (data) => {
                            let geometry = this.convertWkt2Geometry(data.shape);
                            // shapeObj.spatialReference = map.spatialReference;
                            let graphic = new Graphic(geometry, null, data, null);

                            heatmapLayer.add(graphic);
                        });

                    }
                });
        });
    }

    createHeatmapLayer(weightField: string, colors?: string[], blurRadius?: number, maxPixelIntensity?: number): Observable<any> {
        return Observable.create((observer) => {
            esriLoader.dojoRequire(['esri/layers/FeatureLayer', 'esri/renderers/HeatmapRenderer'], (FeatureLayer, HeatmapRenderer) => {
                let layerDefinition = {
                    'geometryType': 'esriGeometryPoint',
                    'fields': [{
                        'name': weightField,
                        'type': 'esriFieldTypeFloat',
                        'alias': weightField
                    }]
                };
                let featureCollection = {
                    layerDefinition: layerDefinition,
                    featureSet: null
                };
                let options = {
                    mode: FeatureLayer.MODE_SNAPSHOT,
                    // outFields: ['*'],
                    // id: 'heatmap-layer-id',
                    // visible: true
                };

                let featureLayer = new FeatureLayer(featureCollection, options);

                let heatmapRenderer = new HeatmapRenderer({
                    colors: ['rgba(0, 0, 0, 0)', 'rgb(0, 0, 255)', 'rgb(255, 0, 255)', 'rgb(255, 0, 0)'],
                    field: weightField, //'count',
                    blurRadius: blurRadius != null ? blurRadius : 10,
                    minPixelIntensity: 0,
                    maxPixelIntensity: maxPixelIntensity != null ? maxPixelIntensity : 100
                });

                featureLayer.setRenderer(heatmapRenderer);
                // map.addLayer(featureLayer);

                observer.next(featureLayer);
            });
        });


    }
}
