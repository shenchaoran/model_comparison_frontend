import { Injectable, Inject } from '@angular/core';
import { Resolve } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { EsriLoaderService } from 'angular2-esri-loader';

@Injectable()
export class EsriMapResolveService implements Resolve<any> {
    private arcgisPath: any;
    private loaded = false;

    constructor(@Inject(DOCUMENT) private document, private esriLoader: EsriLoaderService) {
        this.arcgisPath = JSON.parse(localStorage.getItem('arcgisPath'));
    }

    resolve() {
        if(!this.loaded){
            let link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.type = 'text/css';
            link.href = this.arcgisPath.css;
            this.document.head.appendChild(link);

            // only load the ArcGIS API for JavaScript when we get to this route
            return this.esriLoader.load({
                // use a specific version of the API instead of the latest
                // url: 'http://58.210.9.131/js_arcgis_api/3.20/init.js'
                url: this.arcgisPath.js
            }).then(() => {
                this.loaded = true;
                
                return true;
                // load the map class needed to create a new map
                // and make it available in the route's data
                // return this.esriLoader.loadModules(['esri/map', 'esri/dijit/Scalebar']);
                
            });
        } else {
            return new Promise((resolve, reject) => { resolve(true); });
        }
    }
}
