import { Observable } from 'rxjs/Observable';

// import { MAP_DRAW_TYPE } from './map.draw.type';

export interface MapService {

    /** map */
    createMap(domNodeOrId: string): any;

    createDoubleMap(domNodeOrId: string): any;

    setInitExtent(mapId: string);

    setMapExtent(extentInfo: any, mapId: string, zoom?: number);

    zoomIn();

    zoomOut();

    mapCenterAt(pointX: number, pointY: number);

    mapCenterAndZoom(pointX: number, pointY: number, zoomLevel: number);

    measureLength();

    measureArea();

    getClickPoint();

    /** layers */
    loadTiledLayer(layerAid: string, layerInfo: any, mapId: string, index?: number);

    loadDynamicLayer(layerAid: string, layerInfo: any, mapId: string, index?: number);

    loadFeatureLayer(layerAid: string, layerInfo: any, mapId: string, index?: number);

    removeMapLayer(layerAid: string, mapId: string);

    setLayerOpacity(layerAid: string, opacity: number, mapId: string);

    /** graphics */
    drawGraphic(type: any): Observable<any>;

    addGeometryToMap(geometry: any, symbolName: string);

    addWktGeoToMap(wktStr: string, symbolName: string);


    /** popUp */
    
}