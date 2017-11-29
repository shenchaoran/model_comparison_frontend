import { NgModule, ModuleWithProviders }      from '@angular/core';

import { TreeModule } from 'ng2-tree';
import { EsriLoaderService } from 'angular2-esri-loader';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { SharedModule } from '../../shared';

import { MapViewRoutingModule } from './mapView.routing.module';
import { EsriMapResolveService } from './basemap/arcgis/esri-map-resolve.service';

import { MapView } from './mapView.component';
import { Map } from './basemap/map.component';
import { SwipeMap } from './basemap/swipeMap.component';
import { CompareMap } from './basemap/compareMap.component';
import { MapToolBar } from './toolbar/mapToolBar.component';
import { LayersTree } from './layerstree/mapLayersTree.component';
import { ArcgisMaps } from './basemap/arcgis/arcgisMap.component';
import { ArcgisPopUp } from './basemap/arcgis/arcgisPopUp/arcgis.popUp.component';
import { OlPopUp } from './basemap/openlayers/olPopUp/ol.popUp.component';
import { XciePopUp } from './basemap/openlayers/xcie-popup/xcie-popup.component';

import { OpenLayersMaps } from './basemap/openlayers/openlayersMap.component';

import { MapViewDirective } from './mapView.directive';
import { ArcgisPopUpAnchorDirective } from './basemap/arcgis/arcgisPopUp/arcgis.popUp.directive';
import { OlPopUpAnchorDirective } from './basemap/openlayers/olPopUp/ol.popUp.directive';
import { MapInquireService } from './map.inquire.service';
import { ArcgisMapService } from './basemap/arcgis/arcgisMap.service';
import { EsriSymbolService } from './basemap/arcgis/esri.symbol.service';
import { OLSymbolService } from './basemap/openlayers/openlayers.symbol.service';
import { OpenLayersService } from './basemap/openlayers/openlayersMap.service';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

@NgModule({
    imports: [
       
        TreeModule,

        MapViewRoutingModule,

        SharedModule,
        // CoreModule.forRoot(),

        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
    ],
    declarations: [
        MapView,
        Map,
        SwipeMap,
        CompareMap,
        MapToolBar,
        LayersTree,
        MapViewDirective,

        ArcgisMaps,
        ArcgisPopUpAnchorDirective,
        ArcgisPopUp,

        OpenLayersMaps,
        OlPopUpAnchorDirective,
        OlPopUp,
        XciePopUp,
    ],
    providers: [
        EsriLoaderService,
        EsriMapResolveService, 

        MapInquireService,
        EsriSymbolService,
        OLSymbolService,
        // { provide: 'mapService', useClass: ArcgisMapService },
        { provide: 'mapService', useClass: OpenLayersService },
    ],
    entryComponents: [
        Map,
        SwipeMap,
        CompareMap,
        ArcgisPopUp,
        OlPopUp,
        XciePopUp,
    ],
    exports:[
		MapView
	]
})
export class MapModule {
}
