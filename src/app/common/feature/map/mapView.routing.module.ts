import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapView } from './mapView.component';

import { EsriMapResolveService } from './basemap/arcgis/esri-map-resolve.service';
// import { MapInquireService } from './map.inquire.service';

const routes: Routes = [
    {
        path: '', 
        component: MapView, 
        resolve: {
            // esriModules: EsriMapResolveService,
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