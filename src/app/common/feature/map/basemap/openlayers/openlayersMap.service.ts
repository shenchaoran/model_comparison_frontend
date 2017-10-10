import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as ol from 'openlayers';
import * as echarts from "echarts";

import { MapServiceImpl } from '../map.service';
import { MapConfigService } from '../mapConfig.service';

import { OL_MAP_DRAW_TYPE } from '../map.draw.type';
import { OLSymbolService } from './openlayers.symbol.service';
import { ColorConverter } from '../util/colorCoverter.service';

@Injectable()
export class OpenLayersService extends MapServiceImpl {
	private subscriptions: Array<any>;
	private draw: any;
    private drawSubscription: Subscription;
	private focusMapCounter: number = 0;

	constructor(http: HttpClient) {
		super(http);

		this.subscriptions = new Array<any>();
	}

	subscribeTopics() {
		/** map tool bar */
		this.subscriptions.push(
			this.mapChannel.subscribe('map.fullExtent', (data, envelope) => {
				this.setInitExtent(this.map.id);
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
			this.mapChannel.subscribe('map.drawPoint', (data, envelope) => {
				if(this.drawSubscription){
                    this.drawSubscription.unsubscribe();
                }
				this.drawGraphic(OL_MAP_DRAW_TYPE.POINT).subscribe({
					next: geometry => { }
				});
			})
		);

		this.subscriptions.push(
			this.mapChannel.subscribe('map.drawPolyline', (data, envelope) => {
				if(this.drawSubscription){
                    this.drawSubscription.unsubscribe();
                }
				this.drawGraphic(OL_MAP_DRAW_TYPE.POLYLINE).subscribe({
					next: geometry => { }
				});
			})
		);

		this.subscriptions.push(
			this.mapChannel.subscribe('map.drawPolygon', (data, envelope) => {
				if(this.drawSubscription){
                    this.drawSubscription.unsubscribe();
                }
				this.drawGraphic(OL_MAP_DRAW_TYPE.POLYGON).subscribe({
					next: geometry => { }
				});
			})
		);

		this.subscriptions.push(
			this.mapChannel.subscribe('map.selectCircle', (data, envelope) => {
				if(this.drawSubscription){
                    this.drawSubscription.unsubscribe();
                }
				this.drawGraphic(OL_MAP_DRAW_TYPE.CIRCLE).subscribe({
					next: geometry => {
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
				this.drawGraphic(OL_MAP_DRAW_TYPE.RECTANGLE).subscribe({
					next: geometry => {
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
				this.drawGraphic(OL_MAP_DRAW_TYPE.POLYGON).subscribe({
					next: geometry => {
						this.mapChannel.publish('map.selectPolygon.callback', {
							geometry: this.convertGeometry2Wkt(geometry)
						});
					}
				});
			})
		);

		this.subscriptions.push(
			this.mapChannel.subscribe('map.clearGraphics', (data, envelope) => {
				this.clearGraphics();
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
			this.mapChannel.subscribe('map.changeBaseMap', (data, envelope) => {
				let mapId = data.mapId;
				let layerAid = data.layerAid;

				this.changeBaseMap(layerAid, mapId, false);
			})
		);

		this.subscriptions.push(
			this.mapChannel.subscribe('layers.add', (data, envelope) => {
				this.loadMapLayer(data.layerAid, data.mapId);
			})
		);

		this.subscriptions.push(
			this.mapChannel.subscribe('layers.remove', (data, envelope) => {
				this.removeMapLayer(data.layerAid, data.mapId);
			})
		);

		this.subscriptions.push(
			this.mapChannel.subscribe('layers.removeAll', (data, envelope) => {
				this.removeAllMapLayer(data.mapId);
			})
		);

		this.subscriptions.push(
			this.mapChannel.subscribe('map.mapClick', (data, envelope) => {
				let graphicsLayer = 'map-click-layer';
				// this.clearLayerGraphics(graphicsLayer);

				this.getClickPoint();
			})
		);

		this.subscriptions.push(
			this.mapChannel.subscribe('map.showXCIEQueryResults', (data, envelope) => {
				// this.showQueryResults(data.type, data.result);
				this.showXCIEQueryResults(data.type, data.result);
				// console.log(data.result);
			})
		);

		// this.subscriptions.push(
		// 	this.mapChannel.subscribe('map.showXciePopUp', (data, envelope) => {
		// 		this.showXciePopUp();
		// 	})
		// );
	}

	unsubscribeTopics() {
		_.forEach(this.subscriptions, topic => {
			postal.unsubscribe(topic);
		});
	}

	/** map */
	createMap(domNodeOrId: string): Observable<any> {
		return Observable.create(observer => {
			// let options = {
			//     logo: false,
			//     slider: false
			// };

			this.map = new ol.Map({
				target: domNodeOrId,
				logo: false,
				controls: [new ol.control.ScaleLine()]
				// renderer: ('webgl'),
			});

			// let scalebar = new Scalebar({
			//     map: this.map,
			//     scalebarStyle: 'line',
			//     scalebarUnit: 'dual'
			// });

			// let mapOnLoad = this.map.on('postrender', () => {
			//     alert();
			//     // this.setInitExtent(domNodeOrId);
			// });

			this.bandingMapFireEvent();

			observer.complete();
		});
	}

	createDoubleMap(domNodeOrId: string): Observable<any> {
		return Observable.create(observer => {
			let theMap = new ol.Map({
				target: domNodeOrId,
				logo: false,
				controls: [new ol.control.ScaleLine()]
			});
			theMap.set('id', domNodeOrId);
			this.maps[domNodeOrId] = theMap;

			theMap.on('movestart', event => {
				if (++this.focusMapCounter % 2 === 1) {
					this.setFocusMap(theMap.get('id'));
				}
			});
			theMap.on('moveend', event => {
				for (let mapId in this.maps) {
					if (mapId !== this.focusMap) {
						let _map = this.maps[this.focusMap];
						let extent = _map.getView().calculateExtent(_map.getSize());
						let zoom = _map.getView().getZoom();
						this.setMapExtent(extent, mapId, zoom);
						break;
					}
				}
			});

			observer.complete();
		});
	}





	setAnimationPolygon(geometry, duration, fillColor?, borderColor?) {
		let start = new Date().getTime();
		// let duration = 3000;
		let tempFillColor = ColorConverter.hexToRgb(fillColor);
		// let tempBorderColor = this.hexToRgb(borderColor);

		let flashLayer = this.getLayerById('flashLayer');
		if (flashLayer === null) {
			flashLayer = this.addVectorLayer('flashLayer');
		}
		flashLayer.setZIndex(1);
		flashLayer.getSource().clear();
		let feature = new ol.Feature({
			geometry: geometry,
		});
		flashLayer.getSource().addFeature(feature);

		let listenerKey = this.map.on('postcompose', (event) => {
			let frameState = event.frameState;
			let elapsed = frameState.time - start;
			let elapsedRatio = elapsed / duration;
			// let opacity = ol.easing.easeOut(this.setMapping(0, 1, 0, 0.2, elapsedRatio));
			let opacity = ol.easing.easeOut(1 - elapsedRatio);
			// if(opacity > 0.6) opacity = 0.6;

			let fColor = [tempFillColor.r, tempFillColor.g, tempFillColor.b, opacity];
			// let bColor = borderColor != null ? [tempBorderColor.r, tempBorderColor.g, tempBorderColor.b, opacity] : [255, 0 , 0, opacity];

			let style = new ol.style.Style({
				// stroke: new ol.style.Stroke({
				//     width: 2,
				//     color: fillColor
				// }),
				fill: new ol.style.Fill({
					color: [tempFillColor.r, tempFillColor.g, tempFillColor.b, opacity]
				})
			});

			_.head(flashLayer.getSource().getFeatures()).setStyle(style);

			if (elapsed > duration) {
				start = new Date().getTime();
			}
			this.map.render();
		});

		return listenerKey;
	}



	bandingMapFireEvent() {
		// var start = new Date().getTime();
		// var listenerKey;


		// let singleClick = new ol.interaction.Select({
		// 	condition: ol.events.condition.singleClick
		// });

		// this.map.addInteraction(singleClick);
		// singleClick.on('select', (e)=> {
		// 	let selFeatures = e.selected;

		// 	_.forEach(selFeatures, (feature)=> {
		// 		console.log((feature.get('popContent')));
		// 		if (feature.get('popContent') !== undefined) {
		// 			this.clearHightlightGraphics();

		// 			this.map.getOverlays().clear();

		// 			let popContent = feature.get('popContent');
		// 			this.highlightGeometry(popContent);
		// 			this.showMapPopUp(popContent, true);

		// 			//test animation
		// 			// let geometry = popContent.popGeo;

		// 			// let highlightGraphicLayer = this.getLayerById('highlightGraphicLayer');
		// 			// let highlightFeature = _.head(highlightGraphicLayer.getSource().getFeatures());
		// 			// // let fillColor = highlightFeature.getStyle().getFill().getColor();
		// 			// // console.log(highlightFeature.getStyle().getFill().getColor());
		// 			// let rgba = highlightFeature.getStyle().getFill().getColor();
		// 			// let fillColor = this.rgbToHex(rgba[0], rgba[1], rgba[2]);
		// 			// let listenerKey = this.setAnimationPolygon(geometry, 3000, fillColor);
		// 		}
		// 	});
		// });

		this.map.on('click', event => {
			let feature = this.map.forEachFeatureAtPixel(event.pixel, feature => {
				return feature;
			});

			if (feature && _.has(feature.get('attributes'), 'popContent')) {
				this.clearHightlightGraphics();

				this.map.getOverlays().clear();

				let popContent = _.get(feature.get('attributes'), 'popContent');
				this.highlightGeometry(popContent.popGeo);
				this.showMapPopUp(popContent, true);


				//test animation
				let geometry = popContent.popGeo;


				// let listenerKey = this.setAnimationPolygon(geometry, 3000, '#ff00ff');
				// if(listenerKey) {
				// 	ol.Observable.unByKey(listenerKey);
				// }
			}


		});

		// this.map.on('pointermove', (event) => {
		//     let pixel = this.map.getEventPixel(event.originalEvent);
		//     let hit = this.map.hasFeatureAtPixel(pixel);

		//     if (hit) {
		//         jQuery('#map').css('cursor', 'pointer');
		//     } else {
		//         jQuery('#map').css('cursor', '');
		//     }
		// });
	}

	mapResize(mapId: string) {
		let theMap = this.getMap(mapId);

		theMap.updateSize();
	}

	setInitExtent(mapId: string) {
		let theMap = this.getMap(mapId);

		if (
			theMap
				.getView()
				.get('spatialReference')
				.indexOf(this.mapConfig.mapinfo.spatialReference) !== -1
		) {
			let xmax = this.mapConfig.mapinfo.extent.xmax;
			let xmin = this.mapConfig.mapinfo.extent.xmin;
			let ymax = this.mapConfig.mapinfo.extent.ymax;
			let ymin = this.mapConfig.mapinfo.extent.ymin;

			this.setMapExtent([xmin, ymin, xmax, ymax], mapId);
		} else {
			postal.channel('MESSAGEBOX_CHANNEL').publish('show', {
				type: 'error',
				content: '图层坐标系不一致',
				duration: 3000
			});
		}
	}

	setMapExtent(extent: any, mapId: string, zoom?: number) {
		let theMap = this.getMap(mapId);

		theMap.getView().fit(extent); //, theMap.getSize()
		if (zoom) {
			theMap.getView().setZoom(zoom);
		}
	}

	zoomIn() {
		let currentZoom = this.map.getView().getZoom();
		this.map.getView().setZoom(currentZoom + 1);
	}

	zoomOut() {
		let currentZoom = this.map.getView().getZoom();
		this.map.getView().setZoom(currentZoom - 1);
	}

	mapCenterAt(pointX: number, pointY: number) {
		this.mapCenterAt2([pointX, pointY]);
	}

	mapCenterAndZoom(pointX: number, pointY: number, zoomLevel: number) {
		this.mapCenterAndZoom2([pointX, pointY], zoomLevel);
	}

	mapCenterAt2(point: any) {
		this.map.getView().setCenter(point);
	}

	mapCenterAndZoom2(point: any, zoomLevel: number) {
		this.map.getView().setCenter(point);
		this.map.getView().setZoom(zoomLevel);
	}

	measureLength() {
		this.addInteraction(OL_MAP_DRAW_TYPE.POLYLINE);
	}

	measureArea() {
		this.addInteraction(OL_MAP_DRAW_TYPE.POLYGON);
	}

	addInteraction(type) {
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
		this.map.addLayer(vector);

		measureTooltipElement = this.createMeasureTooltip(measureTooltipElement);
		helpTooltipElement = this.createHelpTooltip(helpTooltipElement);
		let measureTooltip = this.map.getOverlayById('measureTooltip');
		let helpTooltip = this.map.getOverlayById('helpTooltip');

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
		this.map.addInteraction(draw);

		this.map.getViewport().addEventListener('mouseout', event => {
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
			this.map.removeInteraction(draw);
			this.map.removeOverlay(helpTooltip);
		});

		this.map.on('pointermove', event => {
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

	formatLength(line) {
		let length = Math.round(line.getLength() * 100) / 100;

		let output;
		if (length > 100) {
			output = Math.round(length / 1000 * 100) / 100 + ' ' + 'km';
		} else {
			output = Math.round(length * 100) / 100 + ' ' + 'm';
		}
		return output;
	}

	formatArea(polygon) {
		let area = polygon.getArea();

		let output;
		if (area > 10000) {
			output = Math.round(area / 1000000 * 100) / 100 + ' ' + 'km<sup>2</sup>';
		} else {
			output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
		}
		return output;
	}

	createMeasureTooltip(measureTooltipElement: any) {
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
		this.map.addOverlay(measureTooltip);
		return measureTooltipElement;
	}

	createHelpTooltip(helpTooltipElement: any) {
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
		this.map.addOverlay(helpTooltip);
		return helpTooltipElement;
	}

	getClickPoint() {
		jQuery('#map').css('cursor', 'help');
		this.map.once('click', event => {
			jQuery('#map').css('cursor', '');
			let geometry = this.convertCoordinates2Geometry(
				OL_MAP_DRAW_TYPE.POINT,
				event.coordinate
			);
			let pointWkt = this.convertGeometry2Wkt(geometry);

			this.mapChannel.publish('map.mapClick.callback', {
				mapPoint: pointWkt
			});
		});
	}

	changeBaseMap(layerAid: string, mapId: string, deleteMap: boolean) {
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
			let baseLayerAid = theMap.getLayers().item(0).get('id');

			this.removeMapLayer(baseLayerAid, mapId);

			this.loadMapLayer(layerAid, mapId, 0);
		}
	}

	/** layers */
	loadTiledLayer(
		layerAid: string,
		layerInfo: any,
		mapId: string,
		index?: number){

		let theMap = this.getMap(mapId);

		this.getTokenValue(layerInfo.tokenid).subscribe(token => {
			let layerMetaUrl = layerInfo.url + '?token=' + encodeURIComponent(token);
			this.loadLayerMetaInfo(layerMetaUrl).subscribe(layerMetaInfo => {
				let layerUrl =
					layerInfo.url +
					'/tile/{z}/{y}/{x}' +
					'?token=' +
					encodeURIComponent(token);
				let tiledLayer = new ol.layer.Tile({
					source: new ol.source.XYZ({
						url: layerUrl,
						tileGrid: new ol.tilegrid.TileGrid({
							extent: [
								layerMetaInfo.fullExtent.xmin,
								layerMetaInfo.fullExtent.ymin,
								layerMetaInfo.fullExtent.xmax,
								layerMetaInfo.fullExtent.ymax
							],
							origin: [
								layerMetaInfo.tileInfo.origin.x,
								layerMetaInfo.tileInfo.origin.y
							],
							resolutions: _.map(layerMetaInfo.tileInfo.lods, 'resolution'),
							tileSize: [
								layerMetaInfo.tileInfo.cols,
								layerMetaInfo.tileInfo.rows
							]
						})
					})
				});

				tiledLayer.set('id', layerAid);
				tiledLayer.setZIndex(0);

				theMap.addLayer(tiledLayer);

				//todo
				if (index === 0) {
					let view = new ol.View({
						center: [
							(layerMetaInfo.fullExtent.xmin + layerMetaInfo.fullExtent.xmax) /
							2,
							(layerMetaInfo.fullExtent.ymin + layerMetaInfo.fullExtent.ymax) /
							2
						],
						// projection: layerMetaInfo.spatialReference.wkt,
						resolutions: _.map(layerMetaInfo.tileInfo.lods, 'resolution'),
						zoom: 6
					});

					view.set('spatialReference', layerMetaInfo.spatialReference.wkt);
					theMap.setView(view);

					this.setInitExtent(this.map.id);

				}
			});
		});
	}

	loadDynamicLayer(
		layerAid: string,
		layerInfo: any,
		mapId: string,
		index?: number){

		let theMap = this.getMap(mapId);

		this.getTokenValue(layerInfo.tokenid).subscribe(token => {
			let layerUrl = layerInfo.url;// + '?token=' + encodeURIComponent(token);

			let showLayers = 'show:'.concat(_.join(layerInfo.vls));

			let layer = new ol.layer.Image({
				source: new ol.source.ImageArcGISRest({
					url: layerUrl,
					params: { LAYERS: showLayers },
					projection: null,
					// imageLoadFunction: function (image, src) {
					// 	let projection = { WKT: theMap.getView().get('spatialReference') };

					// 	src = src.replace(
					// 		/(BBOXSR=)(\w)+(?=&)/g,
					// 		'$1' + JSON.stringify(projection)
					// 	).replace(
					// 		/(IMAGESR=)(\w)+(?=&)/g,
					// 		'$1' + JSON.stringify(projection)
					// 		);

					// 	let _image: any = image.getImage();
					// 	_image.src = src + '&token=' + encodeURIComponent(token);
					// 	// image.getImage().src = src + '&token=' + encodeURIComponent(token);
					// }
				})
			});

			layer.set('id', layerAid);
			layer.setZIndex(1);

			theMap.addLayer(layer);
		});
	}

	loadFeatureLayer(
		layerAid: string,
		layerInfo: any,
		mapId: string,
		index?: number) {

    }


    removeMapLayer(layerAid: string, mapId: string) {
		let theMap = this.getMap(mapId);
		let layer = this.getLayerById(layerAid);

		theMap.removeLayer(layer);
	}

	removeAllMapLayer(mapId: string) {
		let theMap = this.getMap(mapId);

		let layers = this.map.getLayers();
		for (let i = 0; i < layers.getLength(); i++) {
			let layer = layers.item(i);
			console.log(layer);
		}
	}

	setLayerOpacity(layerAid: string, opacity: number, mapId: string) {
		let layer = this.getLayerById(layerAid);

		if (layer !== undefined && layer !== null) {
			layer.setOpacity(opacity);
		} else {
			postal
				.channel('MESSAGEBOX_CHANNEL')
				.publish('show', { type: 'error', content: '未找到此图层', duration: 3000 });
		}
	}

	/** graphics */
	drawGraphic(type: OL_MAP_DRAW_TYPE): Observable<any> {
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

			if(this.draw){
				this.map.removeInteraction(this.draw);
			}

			this.draw = new ol.interaction.Draw({
				source: drawGraphicLayer.getSource(),
				type: _.toString(type),
				geometryFunction: geometryFuncton,
				freehand: freehand
			});

			this.draw.on('drawend', event => {
				this.map.removeInteraction(this.draw);

				observer.next(event.feature.getGeometry());
			});

			this.map.addInteraction(this.draw);
		});
	}

	addGeometryToMap(geometry: any, symbolName: string) { }

	addWktGeoToMap(wktStr: string, symbolName: string) {
		let format = new ol.format.WKT();
		let featurething = format.readFeature(wktStr);

		// console.log(featurething);

		var source = new ol.source.Vector({});
		let vector = new ol.layer.Vector({
			source: source
		});
		this.map.addLayer(vector);

		source.addFeature(featurething);
	}

	addGeometryToGraphicLayer(
		layerId: string,
		geometry: any,
		symbolName: string,
		symbolIndex?: number,
		graphicId?: string,
		attributes?: any){

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

	clearGraphics() {
		jQuery('#map').css('cursor', '');
		//清除Overlays
		this.map.getOverlays().clear();

		let layers = this.map.getLayers();
		for (let i = layers.getLength(); i >= 0; i--) {
			let layer = layers.item(i);
			if (layer instanceof ol.layer.Vector) {
				this.map.removeLayer(layer);
			}
		}
	}

	showQueryResults(layerName, data) {
		let layerId = layerName + '-layer';

		let geometryDid = (<any>_.find(data.dd, (dataDefinition: any) => {
			return dataDefinition.dt.toLowerCase() === 'geometry';
		})).did;

		let dpks = _.filter(data.dd, (dataDefinition: any) => {
			return dataDefinition.dpk === 'true' || dataDefinition.dpk === true;
		});

		let popFooter: any = new Array<any>();
		_.forEach(data.linkmore, item => {
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
			// let popCenter: any;

			_.forEach(item, keyVal => {
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
						return dataDefinition.did === key;
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
			popContent.popGeo = popGeo;

			//draw to map
			if (layerId === 'iQuery-layer') {
				// this.addGeoToGraphicLayer(layerId, popGeo, popContent, 'highlight_symbol');
			} else {
				this.addGeometryToGraphicLayer(
					layerId,
					new ol.geom.Point(this.getGeometryCenter(popGeo)),
					'index_picture_marker_symbol',
					parseInt(index) + 1,
					null,
					{ 'popContent': popContent }
				);

				this.addGeometryToGraphicLayer(layerId, popGeo, 'default_symbol');
			}

			if (parseInt(index) === 0) {
				this.highlightGeometry(popGeo);
				this.showMapPopUp(popContent, true);
			}
		});
	}

	showXCIEQueryResults(layerName, data) {
		console.log(111);

		let layerId = layerName + '-layer';

		let geometryDid = (<any>_.find(data.tts, (dataDefinition: any) => {
			return dataDefinition.did === 'Shape';
		})).did;

		_.forEach(data.tdc, (item, index) => {
			let popContent: any = new Object();
			let popId: any = new Object();
			let popGeo: any;
			let popCenterGeo: any;
			let attributes = {};

			_.forEach(item, keyVal => {

				let key: string = keyVal.did;


				if (key === geometryDid) {
					popGeo = this.convertWkt2Geometry(keyVal.dv);
				} else if(key === '区域中心'){
					popCenterGeo = this.convertWkt2Geometry(keyVal.dv);
				} else {
					attributes[key] = keyVal.dv;
				}
			});

			popContent.popId = popId;
			popContent.popAttributes = attributes;
			popContent.popGeo = popGeo;

			let symbol = 'dk_yellow_symbol';
			if(attributes['是否持证']){
				symbol = 'dk_blue_symbol';
			}

			this.addGeometryToGraphicLayer(layerId, popGeo, symbol, null, null, attributes);
			this.addGeometryToGraphicLayer(layerId, popCenterGeo, symbol, null, null, attributes);

			if (parseInt(index) === 0) {
				this.showXciePopUp(popContent, true);
				// this.mapCenterAndZoom2(popCenterGeo.getCoordinates(), this.map.getView().getMaxZoom() - 2);
			}
		});
	}

	createPopItem(dataDefinition, value) {
		let pop: any = new Object();
		pop.id = dataDefinition.did;
		pop.colTitle = dataDefinition.dct;
		pop.value = value + dataDefinition.du;

		return pop;
	}

	showXciePopUp(popContent: any, zoom: boolean) {
		let popGeoCenter = this.getGeometryCenter(popContent.popGeo);

		let container = document.createElement('div');
		container.className = 'ol-popup';
		container.id = 'popup';

		let content = document.createElement('div');
		content.className = 'ol-popup-content';
		content.id = 'popup-content';

		let closer = document.createElement('a');
		closer.className = 'ol-popup-closer';
		closer.id = 'popup-closer';
		closer.href = '#';

		container.appendChild(closer);
		container.appendChild(content);

		let overlay = new ol.Overlay({
			element: container,
			autoPan: true,
			positioning: 'top-left',
			offset: [0, 0],
			// id: _.head(_.values(popContent.popId))
		});
		overlay.setPosition(popGeoCenter);
		this.map.addOverlay(overlay);

		closer.onclick = (event) => {
			// let graphicsId = _.head(_.values(popContent.popId));
			this.clearHightlightGraphics();
			overlay.setPosition(undefined);
			closer.blur();
			return false;
		};

		postal
			.channel('POPUP_CHANNEL')
			.publish('xcie.popUp.show', { popContent: popContent });

		if (zoom) {
			this.mapCenterAndZoom2(popGeoCenter, this.map.getView().getMaxZoom() - 2);
		} else {
			this.mapCenterAt2(popGeoCenter);
		}
	}

	showMapPopUp(popContent: any, zoom: boolean) {
		let popGeoCenter = this.getGeometryCenter(popContent.popGeo);

		let container = document.createElement('div');
		container.className = 'ol-popup';
		container.id = 'popup';

		let content = document.createElement('div');
		content.className = 'ol-popup-content';
		content.id = 'popup-content';

		let closer = document.createElement('a');
		closer.className = 'ol-popup-closer';
		closer.id = 'popup-closer';
		closer.href = '#';

		container.appendChild(closer);
		container.appendChild(content);

		let overlay = new ol.Overlay({
			element: container,
			autoPan: true,
			positioning: 'top-left',
			offset: [0, 0],
			id: _.head(_.values(popContent.popId))
		});
		overlay.setPosition(popGeoCenter);
		this.map.addOverlay(overlay);

		closer.onclick = (event) => {
			// let graphicsId = _.head(_.values(popContent.popId));
			this.clearHightlightGraphics();
			overlay.setPosition(undefined);
			closer.blur();
			return false;
		};

		postal
			.channel('POPUP_CHANNEL')
			.publish('ol.popUp.show', { popContent: popContent });

		if (zoom) {
			this.mapCenterAndZoom2(popGeoCenter, this.map.getView().getMaxZoom() - 2);
		} else {
			this.mapCenterAt2(popGeoCenter);
		}
	}

	addVectorLayer(layerId: string) {
		let source = new ol.source.Vector({
			wrapX: false
		});

		let vector = new ol.layer.Vector({
			source: source
		});
		vector.set('id', layerId);

		this.map.addLayer(vector);

		return vector;
	}

	getLayerById(id: string) {
		let layers = this.map.getLayers();
		for (let i = 0; i < layers.getLength(); i++) {
			let layer = layers.item(i);
			if (layer.get('id') === id) {
				return layer;
			}
		}

		return null;
	}

	highlightGeometry(geometry: any) {
		let highlightGraphicLayer = this.getLayerById('highlightGraphicLayer');

		if (highlightGraphicLayer === null) {
			highlightGraphicLayer = this.addVectorLayer('highlightGraphicLayer');
		} else {
			this.clearHightlightGraphics();
		}

		this.addGeometryToGraphicLayer('highlightGraphicLayer', geometry, 'highlight_symbol');
	}

	clearHightlightGraphics() {
		let highlightGraphicLayer = this.getLayerById('highlightGraphicLayer');
		if (highlightGraphicLayer !== null) {
			highlightGraphicLayer.getSource().clear();
		}
	}

	getGeometryCenter(geometry: any) {
		return ol.extent.getCenter(geometry.getExtent());
	}

	convertCoordinates2Geometry(type, coordinates) {
		switch (type) {
			case OL_MAP_DRAW_TYPE.POINT:
				return new ol.geom.Point(coordinates);
			case OL_MAP_DRAW_TYPE.POLYGON:
				return new ol.geom.Polygon(coordinates);
		}
	}

	convertWkt2Geometry(wktStr) {
		let format = new ol.format.WKT();
		return format.readGeometry(wktStr);
	}

	convertGeometry2Wkt(geometry) {
		if (geometry instanceof ol.geom.Circle) {
			geometry = ol.geom.Polygon.fromCircle(geometry);
		}

		let format = new ol.format.WKT();
		return format.writeGeometry(geometry);
	}

}
