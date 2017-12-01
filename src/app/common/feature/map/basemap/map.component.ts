import { Component, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';

import { MAP_MODULE_CONFIG } from '@config/map.config.old';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styles: []
})

export class Map {
    mapId: string = 'map';
    moduleEncode: string = 'mapmodule';
    childrenModules: any;
    // show: false;

    constructor() {}

    ngOnInit() {
        this.childrenModules = MAP_MODULE_CONFIG;
    }

    includesModule(moduleEncode) {
        return _.includes(this.childrenModules, moduleEncode);
    }
}
