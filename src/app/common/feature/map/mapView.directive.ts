import { Directive, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';

import { Map } from './basemap/map.component';
import { SwipeMap } from './basemap/swipeMap.component';
import { CompareMap } from './basemap/compareMap.component';

@Directive({
    selector: 'mapView-anchor'
})
export class MapViewDirective {
    private subscriptions: Array<any>;

    private mapComponentRef: ComponentRef<any> = null;

    constructor(private viewContainer: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
        this.subscriptions = new Array<any>();
        
        let channel = postal.channel('MAPVIEW_CHANNEL');

        this.subscriptions.push(
            channel.subscribe('map.create', (data, envelope) => {
                this.createMap();
            })
        );

        this.subscriptions.push(
            channel.subscribe('swipmap.create', (data, envelope) => {
                this.createSwipeMap();
            })
        );

        this.subscriptions.push(
            channel.subscribe('comparemap.create', (data, envelope) => {
                this.createCompareMap();
            })
        );
    }

    ngOnDestroy() {
        _.forEach(this.subscriptions, (item) => {
            postal.unsubscribe(item);
        });

    }

    detachDetectorRefchange(){
        if (this.mapComponentRef) {
            // 从变更检测树上分离
            this.mapComponentRef.changeDetectorRef.detach();
        }
    }

    createMap() {
        let mapComponent = new Map();

        this.viewContainer.clear();

        let mapComponentFactory = this.componentFactoryResolver.resolveComponentFactory(Map);

        this.detachDetectorRefchange();

        this.mapComponentRef = this.viewContainer.createComponent(mapComponentFactory);

        let popUpInstance = this.mapComponentRef.instance;

        // 手动调用变更检测
        this.mapComponentRef.changeDetectorRef.detectChanges();

        // return this.mapComponentRef;
    }

    createSwipeMap() { //: ComponentRef<SwipeMap>
        let mapComponent = new SwipeMap();

        this.viewContainer.clear();

        let mapComponentFactory = this.componentFactoryResolver.resolveComponentFactory(SwipeMap);

        this.detachDetectorRefchange();

        this.mapComponentRef = this.viewContainer.createComponent(mapComponentFactory);

        let popUpInstance = this.mapComponentRef.instance;

        // 手动调用变更检测
        this.mapComponentRef.changeDetectorRef.detectChanges();

        // return mapComponentRef;
    }

    createCompareMap() { //: ComponentRef<CompareMap>
        let mapComponent = new CompareMap();

        this.viewContainer.clear();

        let mapComponentFactory = this.componentFactoryResolver.resolveComponentFactory(CompareMap);

        this.detachDetectorRefchange();

        this.mapComponentRef = this.viewContainer.createComponent(mapComponentFactory);

        let popUpInstance = this.mapComponentRef.instance;

        // 手动调用变更检测
        this.mapComponentRef.changeDetectorRef.detectChanges();

        // return mapComponentRef;
    }
}