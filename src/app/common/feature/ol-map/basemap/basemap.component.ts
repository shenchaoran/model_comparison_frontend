import { Component, OnInit } from '@angular/core';

import { Layer, LAYER_TYPE, Map, MAP_TYPE } from '../model';

@Component({
    selector: 'ogms-basemap',
    templateUrl: './basemap.component.html',
    styleUrls: ['./basemap.component.scss']
})
export class BasemapComponent implements OnInit {
    map: Map;
    
    constructor() {}

    ngOnInit() {}
}
