import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapView } from './mapView.component';

import { EsriMapResolveService } from './basemap/arcgis/esri-map-resolve.service';
// import { MapInquireService } from './map.inquire.service';
import { MapConfigService } from './basemap/mapConfig.service';

const routes: Routes = [
    {
        path: '', 
        component: MapView, 
        resolve: {
            // esriModules: EsriMapResolveService,
            mapConfig: MapConfigService,
            // mapInquireService: MapInquireService

        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MapViewRoutingModule { }