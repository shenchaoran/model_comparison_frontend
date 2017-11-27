import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MapService } from './map.service.interface';
// import { MAP_DRAW_TYPE } from './map.draw.type';
import { ErrorHandle } from '@core/base/error-handle';


export abstract class MapServiceImpl extends ErrorHandle implements MapService {
    protected mapConfig: any;

    protected mapChannel:any;
    protected map: any;
    protected maps: { [id: string] : any; }
    protected focusMap: string;

    constructor(protected http: HttpClient){
        super();
        this.mapChannel = postal.channel('MAP_CHANNEL');

        this.maps = {};

        //test
        // postal.channel('MESSAGEBOX_CHANNEL').publish('show', {type:'warn', content:'消息'});
    }

    /** map */
    protected getMap(mapId?: string){
        if(mapId === undefined || mapId === 'map'){
            return this.map;
        } else {
            return this.maps[mapId];
        }
    }

    protected setMapConfig(mapConfig: any){
        this.mapConfig = mapConfig;
    }

    protected setFocusMap(mapId){
        if(this.focusMap !== mapId || this.focusMap === undefined){
            this.focusMap = mapId;
        }
    }

    abstract createMap(domNodeOrId: string): Observable<any>;

    abstract createDoubleMap(domNodeOrId: string): Observable<any>;

    abstract setInitExtent(mapId: string);

    abstract setMapExtent(extent: any, mapId: string);

    abstract zoomIn();

    abstract zoomOut();

    abstract mapCenterAt(pointX: number, pointY: number);

    abstract mapCenterAndZoom(pointX: number, pointY: number, zoomLevel: number);

    abstract measureLength();

    abstract measureArea();

    abstract getClickPoint();

    /** layers */
    protected loadLayerMetaInfo(layerMetaUrl: string): Observable<any>{
        return this.http.get(layerMetaUrl)
                    // .map(res => res.json())
                    .catch(this.handleError);
    }

    protected getLayersInfo(layerAid: string): any{
        let layersInfo = [];

        let aLayer = _.find(this.mapConfig.alayers, function(aLayer) { 
                        return (<any>aLayer).aid === layerAid; 
                    });
          
        for(let layer of (<any>aLayer).layers) {
             let layerInfo = _.find(this.mapConfig.layers, function(o) { 
                                return (<any>o).id === layer.id; 
                            });

             if(layer.hasOwnProperty('vls')){
                 (<any>layerInfo).vls = layer.vls;
             }               

            layersInfo.push(layerInfo);
        }

        return layersInfo;
    }

    protected loadDefaultLayers(mapId?: string) {
        for(let layer of this.mapConfig.defaultlayers) {
            if(layer.isbase == true) {
                this.loadMapLayer(layer.aid, mapId, 0);  
            } else {
                this.loadMapLayer(layer.aid, mapId, undefined); 
            }
        }
    }

    protected loadMapLayer(layerAid: string, mapId: string, index?: number){
        let layersInfo = this.getLayersInfo(layerAid);

        for(let layerInfo of layersInfo){
            switch (layerInfo.type) {
                case 'esri-tiledlayer':
                    this.loadTiledLayer(layerAid, layerInfo, mapId, index);
                    break;
                case 'esri-dynamiclayer':
                    this.loadDynamicLayer(layerAid, layerInfo, mapId, index);
                    break;
                case 'esri-featurelayer':
                    this.loadFeatureLayer(layerAid, layerInfo, mapId, index);
                    break;
            }
        } 
    }

    abstract loadTiledLayer(layerAid: string, layerInfo: any, mapId: string, index?: number);

    abstract loadDynamicLayer(layerAid: string, layerInfo: any, mapId: string, index?: number);

    abstract loadFeatureLayer(layerAid: string, layerInfo: any, mapId: string, index?: number);

    abstract removeMapLayer(layerAid: string, mapId: string);

    abstract setLayerOpacity(layerAid: string, opacity: number, mapId: string);

    /** graphics */
    abstract drawGraphic(type: any): Observable<any>;

    abstract addGeometryToMap(geometry: any, symbolName: string);

    abstract addWktGeoToMap(wktStr: string, symbolName: string);

    /** token */
    protected getTokenValue(tokenId: string): Observable<any>{
        let tokenInfo: any = _.find(this.mapConfig.tokens, function(item){
                                    return (<any>item).id === tokenId;
                                });

        return new Observable(observer => {
            if(tokenInfo.type === 'web'){
                
                if(tokenInfo.val === undefined){

                    this.http.get(tokenInfo.uri)
                                // .map(res => { res.text(); })
                                .toPromise()
                                .then(res => {
                                    // console.log(res);
                                    tokenInfo.val = (<any>res).text(); 

                                    observer.next(res);
                                })
                                .catch(this.handleError);
                } else {
                    observer.next(tokenInfo.val);
                }
            } else if(tokenInfo.type === 'result'){
                observer.next(tokenInfo.val);
            }
        });
    }
}   