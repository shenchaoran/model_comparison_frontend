import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as esriLoader from 'esri-loader';

@Injectable()
export class EsriSymbolService {

    constructor() { 
    }

    getSymbol(geometryType: string, symbolName: string, index?: number): any {
        return Observable.create((observer)=> {
            esriLoader.dojoRequire([
                    'esri/Color',
                    'esri/symbols/Symbol',
                    'esri/symbols/SimpleMarkerSymbol',
                    'esri/symbols/PictureMarkerSymbol',
                    'esri/symbols/SimpleLineSymbol',
                    'esri/symbols/SimpleFillSymbol'], 
            (Color, Symbol, SimpleMarkerSymbol, PictureMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol) => {
                let symbol: Symbol;
                let iconPath: string;
                
                let symbolId = geometryType + '_' + symbolName;
                switch (symbolId) {
                    /** default symbol */
                    case 'point_default_symbol':
                    case 'multipoint_default_symbol':
                        symbol = new SimpleMarkerSymbol();
                        break;
                    case 'polyline_default_symbol':
                        symbol = new SimpleLineSymbol();
                        break;
                    case 'polygon_default_symbol':
                        symbol = new SimpleFillSymbol();
                        break;

                    case 'point_highlight_symbol':
                        // iconPath = `assets/img/map/poi/icon_dibiao_${index}.png`;
                        // symbol = new PictureMarkerSymbol(iconPath, 30, 30);
                        break;
                    case 'polygon_highlight_symbol':
                        symbol = new SimpleFillSymbol({ 'type': 'esriSFS', 'style': 'esriSFSSolid', 'color': [255, 0, 0, 120], 'outline': { 'type': 'esriSLS', 'style': 'esriSLSSolid', 'color': [255, 0, 0, 255], 'width': 2 } });
                        break;        

                     /** custom symbol */
                     case 'point_dibiao_picture_marker_symbol':
                     case 'polygon_dibiao_picture_marker_symbol':
                         iconPath = `assets/img/map/poi/icon_dibiao_null.png`;
                         symbol = new PictureMarkerSymbol(iconPath, 20, 21);
                         break; 
                    case 'point_index_picture_marker_symbol':
                    case 'polygon_index_picture_marker_symbol':
                        iconPath = `assets/img/map/poi/icon_dibiao_${index}.png`;
                        symbol = new PictureMarkerSymbol(iconPath, 30, 30);
                        break; 

                    case 'polyline_measure_symbol':
                        symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([253, 128, 68]), 3);
                        break;
                        
                    case 'polygon_measure_symbol':
                        let lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([253, 128, 68]), 2);
                        symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol, new Color([0, 255, 123, 0.4]));
                        break;
                }

                observer.next(symbol);
                observer.complete();
            });
        });    
    }

    getDefaultSymbol(type: string): any {
        return Observable.create((observer)=> {
            esriLoader.dojoRequire(['esri/symbols/Symbol',
                                    'esri/symbols/SimpleMarkerSymbol',
                                    'esri/symbols/SimpleLineSymbol',
                                    'esri/symbols/SimpleFillSymbol'], 
            (Symbol, SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol) => {
                let symbol: Symbol;
                switch (type) {
                    case 'point':
                    case 'multipoint':
                        symbol = new SimpleMarkerSymbol();
                        break;
                    case 'polyline':
                        symbol = new SimpleLineSymbol();
                        break;
                    case 'polygon':
                        symbol = new SimpleFillSymbol();
                        break;
                }

                observer.next(symbol);
                observer.complete();
            });
        });    
    }
}