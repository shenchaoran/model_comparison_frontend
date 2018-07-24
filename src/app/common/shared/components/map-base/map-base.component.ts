import {
    Component,
    OnInit,
    AfterViewInit,
    HostListener
} from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { OgmsBaseComponent } from '../ogms-base/ogms-base.component';
import { DocBaseComponent } from '../doc-base/doc-base.component';
import { Observable } from 'rxjs';
declare const ol: any;

@Component({
    selector: 'ogms-map-base',
    templateUrl: './map-base.component.html',
    styleUrls: ['./map-base.component.scss']
})
export class MapBaseComponent extends OgmsBaseComponent implements OnInit, AfterViewInit {
    public targetId;
    public map;
    public observable;
    constructor() {
        super();
        this.targetId = uuidv1();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.observable = Observable.create(observer => {
            setTimeout(() => {
                this.map = new ol.Map({
                    target: this.targetId,
                    layers: [
                        new ol.layer.Tile({
                            title: 'OSM',
                            visible: true,
                            source: new ol.source.OSM()
                        })
                    ],
                    view: new ol.View({
                        center: [0, 0],
                        zoom: 2
                    }),
                    controls: ol.control
                        .defaults({
                            attribution: false,
                            rotate: false,
                            zoom: false
                        })
                        .extend([
                            new ol.control.FullScreen(),
                            new ol.control.ScaleLine()
                        ])
                });
                observer.next();
                observer.complete();
            }, 0);
        });
    }

    @HostListener('window:resize')
    resize() {
        this.map.updateSize();
    }
}
