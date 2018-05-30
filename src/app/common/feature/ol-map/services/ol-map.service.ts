import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { _HttpClient } from '@core/services/http.client';
import * as uuidv1 from 'uuid/v1';
import * as echarts from 'echarts';
import { MapService } from './map.service';
import { OLSymbolService } from './ol-symbol.service';
import { OL_MAP_DRAW_TYPE } from '../models';
import { ColorConverter } from '@utils/colorCoverter.service';
declare const ol: any;

@Injectable()
export class OlMapService extends MapService {
    constructor(protected http: _HttpClient) {
        super(http);
    }

    // region toolbar
    pan() { }

    zoomIn() {
        let currentZoom = this.selectedMap.getView().getZoom();
        this.selectedMap.getView().setZoom(currentZoom + 1);
    }

    zoomOut() {
        let currentZoom = this.selectedMap.getView().getZoom();
        this.selectedMap.getView().setZoom(currentZoom - 1);
    }

    fullExtent() {
        this.selectedMap.getView().fit(this.selectedMap.getSize());
    }

    measureLength() {
        this.addInteraction(OL_MAP_DRAW_TYPE.POLYLINE);
    }

    measureArea() {
        this.addInteraction(OL_MAP_DRAW_TYPE.POLYGON);
    }

    drawPoint() {
        this.drawFeature(OL_MAP_DRAW_TYPE.POINT).subscribe({
            next: null
        });
    }

    drawLine() {
        this.drawFeature(OL_MAP_DRAW_TYPE.POLYLINE).subscribe({
            next: null
        });
    }

    drawPolygon() {
        this.drawFeature(OL_MAP_DRAW_TYPE.POLYGON).subscribe({
            next: null
        });
    }

    clearDraw() {
        this.clearGraphics();
    }

    selectByCircle() {
        this.drawFeature(OL_MAP_DRAW_TYPE.CIRCLE).subscribe({
            next: geometry => {
                console.log(geometry);
            }
        });
    }

    selectByRectangle() {
        this.drawFeature(OL_MAP_DRAW_TYPE.RECTANGLE).subscribe({
            next: geometry => {
                this.highlightGeometry(geometry);
                console.log(geometry);
            }
        });
    }

    selectByPolygon() {
        this.drawFeature(OL_MAP_DRAW_TYPE.POLYGON).subscribe({
            next: geometry => {
                console.log(geometry);
            }
        });
    }
    // endregion

    //
    public createMap(domId: string) {
        const baseGroup = new ol.layer.Group({
            title: 'Base',
            layers: [
                new ol.layer.Tile({
                    title: 'OSM',
                    visible: true,
                    source: new ol.source.OSM()
                })
            ]
        });
        const map = new ol.Map({
            target: domId,
            layers: [
                baseGroup
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
        const guid = uuidv1();
        this.upsertMap(guid, map);
        this.loadDefaultVectorLayer();
        return map;
    }

    public createDefaultMap(domId: string, mapId?: string) {
        const map = new ol.Map({
            target: domId,
            layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
            view: new ol.View({
                center: [0, 0],
                zoom: 2
            })
        });

        const guid = mapId ? mapId : uuidv1();
        this.upsertMap(guid, map);

        // this.loadDefaultTileLayer();
        this.loadDefaultVectorLayer();
        // this.setDefaultView();

        return guid;
    }

    public loadDefaultTileLayer() {
        this.selectedMap.addLayer(
            new ol.layer.Tile({
                id: 'base-OSM',
                source: new ol.source.OSM()
            } as any)
        );
    }

    public loadDefaultImageLayer() { }

    private loadDefaultVectorLayer() {
        this.selectedMap.addLayer(
            new ol.layer.Vector({
                id: 'draw-point',
                source: new ol.source.Vector({
                    projection: 'EPSG:4326'
                } as any)
            } as any)
        );

        this.selectedMap.addLayer(
            new ol.layer.Vector({
                id: 'draw-polyline',
                source: new ol.source.Vector({
                    projection: 'EPSG:4326'
                } as any)
            } as any)
        );

        this.selectedMap.addLayer(
            new ol.layer.Vector({
                id: 'draw-polygon',
                source: new ol.source.Vector({
                    projection: 'EPSG:4326'
                } as any)
            } as any)
        );
    }

    public loadTileLayer() { }

    public loadImageLayer() { }

    public loadVectorLayer() { }

    public getLayer(id: string) {
        return _.find(this.selectedMap.getLayers().getArray(), layer => {
            return layer.getProperties().id === id;
        });
    }

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
        if (this.selectedMap) {
            this.selectedMap.updateSize();
        }
    }

    // region measure
    private addInteraction(type) {
        let sketch: any;
        let helpTooltipElement: any;
        let measureTooltipElement: any;

        let source = new ol.source.Vector();
        let vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        vector.set('id', 'measure-vector');
        this.selectedMap.addLayer(vector);

        measureTooltipElement = this.createMeasureTooltip(
            measureTooltipElement
        );
        helpTooltipElement = this.createHelpTooltip(helpTooltipElement);
        let measureTooltip = this.selectedMap.getOverlayById('measureTooltip');
        let helpTooltip = this.selectedMap.getOverlayById('helpTooltip');

        let draw = new ol.interaction.Draw({
            source: source,
            type: _.toString(type),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });
        this.selectedMap.addInteraction(draw);

        this.selectedMap.getViewport().addEventListener('mouseout', event => {
            helpTooltipElement.classList.add('hidden');
        });

        let listener;
        draw.on('drawstart', event => {
            sketch = event.feature;
            let tooltipCoord = event.coordinate;

            listener = sketch.getGeometry().on('change', event => {
                let geom = event.target;
                let output;
                if (geom instanceof ol.geom.Polygon) {
                    output = this.formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = this.formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        });

        draw.on('drawend', event => {
            measureTooltipElement.className = 'tooltip tooltip-static';
            measureTooltip.setOffset([0, -7]);

            ol.Observable.unByKey(listener);
            this.selectedMap.removeInteraction(draw);
            this.selectedMap.removeOverlay(helpTooltip);
        });

        this.selectedMap.on('pointermove', event => {
            if (event.dragging) {
                return;
            }

            let helpMsg = 'Click to start drawing';

            if (sketch) {
                let geom = sketch.getGeometry();
                if (geom instanceof ol.geom.Polygon) {
                    helpMsg = 'Click to continue drawing the polygon';
                } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = 'Click to continue drawing the line';
                }
            }

            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(event.coordinate);
            helpTooltipElement.classList.remove('hidden');
        });
    }

    private createMeasureTooltip(measureTooltipElement: any) {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'tooltip tooltip-measure';
        let measureTooltip = new ol.Overlay({
            id: 'measureTooltip',
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        this.selectedMap.addOverlay(measureTooltip);
        return measureTooltipElement;
    }

    private createHelpTooltip(helpTooltipElement: any) {
        if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }

        helpTooltipElement = document.createElement('div');
        helpTooltipElement.className = 'tooltip hidden';
        let helpTooltip = new ol.Overlay({
            id: 'helpTooltip',
            element: helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        this.selectedMap.addOverlay(helpTooltip);
        return helpTooltipElement;
    }

    private formatLength(line) {
        let length = Math.round(line.getLength() * 100) / 100;

        let output;
        if (length > 100) {
            output = Math.round(length / 1000 * 100) / 100 + ' ' + 'km';
        } else {
            output = Math.round(length * 100) / 100 + ' ' + 'm';
        }
        return output;
    }

    private formatArea(polygon) {
        let area = polygon.getArea();

        let output;
        if (area > 10000) {
            output =
                Math.round(area / 1000000 * 100) / 100 + ' ' + 'km<sup>2</sup>';
        } else {
            output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
        }
        return output;
    }
    // endregion

    // region layer operation
    private getLayerById(id: string) {
        let layers = this.selectedMap.getLayers();
        for (let i = 0; i < layers.getLength(); i++) {
            let layer = layers.item(i);
            if (layer.get('id') === id) {
                return layer;
            }
        }
        return null;
    }

    private addVectorLayer(layerId: string) {
        let source = new ol.source.Vector({
            wrapX: false
        });

        let vector = new ol.layer.Vector({
            source: source
        });
        vector.set('id', layerId);

        this.selectedMap.addLayer(vector);

        return vector;
    }

    private clearGraphics() {
        jQuery('#map').css('cursor', '');
        //清除Overlays
        this.selectedMap.getOverlays().clear();

        let layers = this.selectedMap.getLayers();
        for (let i = layers.getLength(); i >= 0; i--) {
            let layer = layers.item(i);
            if (layer instanceof ol.layer.Vector) {
                this.selectedMap.removeLayer(layer);
            }
        }
    }
    // endregion

    // region geomotry operation
    private drawFeature(type: OL_MAP_DRAW_TYPE): Observable<any> {
        return Observable.create(observer => {
            if (this.getLayerById('draw-vector') == null) {
                this.addVectorLayer('draw-vector');
            }
            let drawGraphicLayer = this.getLayerById('draw-vector');

            let geometryFuncton;
            let freehand = false;

            if (type === OL_MAP_DRAW_TYPE.CIRCLE) {
                freehand = true;
            } else if (type === OL_MAP_DRAW_TYPE.RECTANGLE) {
                geometryFuncton = ol.interaction.Draw.createBox();
                freehand = true;
            }

            if (this.draw) {
                this.selectedMap.removeInteraction(this.draw);
            }

            this.draw = new ol.interaction.Draw({
                source: drawGraphicLayer.getSource(),
                type: _.toString(type),
                geometryFunction: geometryFuncton,
                freehand: freehand
            });

            this.draw.on('drawend', event => {
                this.selectedMap.removeInteraction(this.draw);

                observer.next(event.feature.getGeometry());
                observer.complete();
            });

            this.selectedMap.addInteraction(this.draw);
        });
    }

    private highlightGeometry(geometry: any) {
        let highlightGraphicLayer = this.getLayerById('highlightGraphicLayer');

        if (highlightGraphicLayer === null) {
            highlightGraphicLayer = this.addVectorLayer(
                'highlightGraphicLayer'
            );
        } else {
            this.clearHightlightGraphics();
        }

        this.addGeometryToGraphicLayer(
            'highlightGraphicLayer',
            geometry,
            'highlight_symbol'
        );
    }

    private addGeometryToGraphicLayer(
        layerId: string,
        geometry: any,
        symbolName: string,
        symbolIndex?: number,
        graphicId?: string,
        attributes?: any
    ) {
        let graphicLayer = this.getLayerById(layerId);
        if (graphicLayer === null) {
            graphicLayer = this.addVectorLayer(layerId);
            graphicLayer.setZIndex(2);
        }

        // let feature = new ol.Feature(new ol.geom.Point(this.getGeometryCenter(geometry)));
        let feature = new ol.Feature(geometry);

        let symbol = OLSymbolService.getSymbol(
            geometry.getType(),
            symbolName,
            symbolIndex
        );

        feature.setStyle(symbol);

        if (graphicId) {
            feature.set('id', graphicId);
        }
        if (attributes) {
            feature.set('attributes', attributes);
        }

        graphicLayer.getSource().addFeature(feature);
    }

    private clearHightlightGraphics() {
        let highlightGraphicLayer = this.getLayerById('highlightGraphicLayer');
        if (highlightGraphicLayer !== null) {
            highlightGraphicLayer.getSource().clear();
        }
    }

    public addFeaturesByJSON(geojson: any) {
        const layer = this.getLayer('draw-point');
        if (layer) {
            const source = layer.getSource();
            const features = new ol.format.GeoJSON().readFeatures(geojson, { featureProjection: 'EPSG:3857' } as any);
            source.addFeatures(features);
        }
    }
    //endregion

    public getMapExtent(extents) {
        let minx, miny, maxx, maxy;
        _.map(extents, extent => {
            if (minx === undefined || minx > extent[0]) {
                minx = extent[0];
            }
            if (miny === undefined || miny > extent[1]) {
                miny = extent[1];
            }
            if (maxx === undefined || maxx < extent[2]) {
                maxx = extent[2];
            }
            if (maxy === undefined || maxy < extent[3]) {
                maxy = extent[3];
            }
        });
        return [minx, miny, maxx, maxy];
    }

    public addDrawPointBar() {
        const mainBar = new ol.control.Bar();
        this.selectedMap.addControl(mainBar);

        const inter = new ol.interaction.Draw({
            type: 'Point',
            source: this.getLayer('draw-point').getSource()
        });
        // inter.on('drawend', _.get(cfg, 'point.cb'));
        const pointEdit = new ol.control.Toggle({
            html: '<i class="fa fa-map-marker" ></i>',
            title: 'Point',
            interaction: inter
        });
        mainBar.addControl(pointEdit);
    }

    public addDrawBar(cfg: {
        point?: any,
        polygon?: any,
        polyline?: any,
        rectangle?: any,
        circle?: any
    }) {
        const mainBar = new ol.control.Bar();
        this.selectedMap.addControl(mainBar);

        if (_.get(cfg, 'point.add')) {
            const inter = new ol.interaction.Draw({
                type: 'Point',
                source: this.getLayer('draw-point').getSource()
            });
            inter.on('drawend', _.get(cfg, 'point.cb'));
            const pointEdit = new ol.control.Toggle({
                html: '<i class="fa fa-map-marker" ></i>',
                title: 'Point',
                interaction: inter
            });
            mainBar.addControl(pointEdit);
        }

        if (_.get(cfg, 'polyline.add')) {
            const inter = new ol.interaction.Draw({
                type: 'LineString',
                source: this.getLayer('draw-polyline').getSource(),
                // Count inserted points
                geometryFunction: function (coordinates, geometry) {
                    if (geometry) geometry.setCoordinates(coordinates);
                    else geometry = new ol.geom.LineString(coordinates);
                    this.nbpts = geometry.getCoordinates().length;
                    return geometry;
                }
            });
            inter.on('drawend', _.get(cfg, 'polyline.cb'));

            const polylineEdit = new ol.control.Toggle({
                html: '<i class="fa fa-share-alt" ></i>',
                title: 'LineString',
                interaction: inter,
                // Options bar associated with the control
                bar: new ol.control.Bar({
                    controls: [
                        new ol.control.TextButton({
                            html: 'undo',
                            title: 'Delete last point',
                            handleClick: function () {
                                if (polylineEdit.getInteraction().nbpts > 1)
                                    polylineEdit.getInteraction().removeLastPoint();
                            }
                        }),
                        new ol.control.TextButton({
                            html: 'Finish',
                            title: 'finish',
                            handleClick: function () {
                                // Prevent null objects on finishDrawing
                                if (polylineEdit.getInteraction().nbpts > 2)
                                    polylineEdit.getInteraction().finishDrawing();
                            }
                        })
                    ]
                })
            });
            mainBar.addControl(polylineEdit);
        }

        if (_.get(cfg, 'polygon.add')) {
            const inter = new ol.interaction.Draw({
                type: 'Polygon',
                source: this.getLayer('draw-polygon').getSource(),
                // Count inserted points
                geometryFunction: function (coordinates, geometry) {
                    this.nbpts = coordinates[0].length;
                    if (geometry)
                        geometry.setCoordinates([
                            coordinates[0].concat([coordinates[0][0]])
                        ]);
                    else geometry = new ol.geom.Polygon(coordinates);
                    return geometry;
                }
            });
            inter.on('drawend', _.get(cfg, 'polygon.cb'));
            
            const polygonEdit = new ol.control.Toggle({
                html: '<i class="fa fa-bookmark-o fa-rotate-270" ></i>',
                title: 'Polygon',
                interaction: inter,
                // Options bar ssociated with the control
                bar: new ol.control.Bar({
                    controls: [
                        new ol.control.TextButton({
                            html: 'undo', //'<i class="fa fa-mail-reply"></i>',
                            title: 'undo last point',
                            handleClick: function () {
                                if (polygonEdit.getInteraction().nbpts > 1)
                                    polygonEdit.getInteraction().removeLastPoint();
                            }
                        }),
                        new ol.control.TextButton({
                            html: 'finish',
                            title: 'finish',
                            handleClick: function () {
                                // Prevent null objects on finishDrawing
                                if (polygonEdit.getInteraction().nbpts > 3)
                                    polygonEdit.getInteraction().finishDrawing();
                            }
                        })
                    ]
                })
            });
            mainBar.addControl(polygonEdit);
        }

        if (_.get(cfg, 'rectangle.add')) {
            const inter = new ol.interaction.DrawRegular({
                source: this.getLayer('draw-polygon').getSource(),
                sides: 4,
                canRotate: false
            });
            inter.on('drawstart', function (e) {
                e.feature.on('change', function () {
                    //   console.log('change');
                });
            });
            inter.on('drawing', function (e) {
                if (e.feature.getGeometry().getArea)
                    jQuery('#info').html(
                        (e.feature.getGeometry().getArea() / 1000000).toFixed(2) +
                        ' km<sup>2</sup>'
                    );
            });
            inter.on('drawend', _.get(cfg, 'polygon.cb'));
            const drawRect = new ol.control.Toggle({
                html: '<i class="fa fa-square-o" aria-hidden="true"></i>',
                title: 'Draw Rectangle',
                interaction: inter
            });
            mainBar.addControl(drawRect);
        }

        if(_.get(cfg, 'circle.add')) {
            const inter = new ol.interaction.Draw({
                type: 'Circle',
                source: this.getLayer('draw-polygon').getSource(),
            });
            inter.on('drawend', _.get(cfg, 'cycle.cb'));
            const drawCycle = new ol.control.Toggle({
                html: '<i class="fa fa-circle" aria-hidden="true"></i>',
                title: 'Draw Circle',
                interaction: inter
            });
            mainBar.addControl(drawCycle);
        }
    }

    // TODO delete bar and selection bar
}
