import { Component, OnInit } from '@angular/core';
import { latLng, LatLng, tileLayer } from 'leaflet';

@Component({
    selector: 'ogms-leaflet-test',
    templateUrl: './leaflet-test.component.html',
    styleUrls: ['./leaflet-test.component.scss']
})
export class LeafletTestComponent implements OnInit {
    options = {
        layers: [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
        ],
        zoom: 5,
        center: latLng(46.879966, -121.726909)
    };
    constructor() { }

    ngOnInit() {
    }

}
