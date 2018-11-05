import {
    Component,
    OnInit,
    AfterViewInit,
    HostListener
} from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { OgmsBaseComponent } from '../../classes';
import { Observable } from 'rxjs';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import Tile from 'ol/layer/Tile';
import View from 'ol/View';
import { defaults as defaultsControl } from 'ol/control/util';
import FullScreen from 'ol/control/FullScreen';
import ScaleLine from 'ol/control/ScaleLine';

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
                this.map = new Map({
                    target: this.targetId,
                    layers: [
                        new Tile({
                            title: 'OSM',
                            visible: true,
                            source: new OSM()
                        } as any)
                    ],
                    view: new View({
                        center: [0, 0],
                        zoom: 2
                    }),
                    controls: defaultsControl({
                        attribution: false,
                        rotate: false,
                        zoom: false
                    })
                        .extend([
                            new FullScreen(),
                            new ScaleLine()
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
