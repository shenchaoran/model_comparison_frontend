import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'ogms-ogms-base',
    templateUrl: './ogms-base.component.html',
    styleUrls: ['./ogms-base.component.scss']
})
export class OgmsBaseComponent implements OnInit, OnDestroy {
    public _subscriptions = [];

    constructor() { }

    ngOnInit() {
    }

    ngOnDestroy() {
        _.map(this._subscriptions, sub => {
            sub.unsubscribe();
        })
    }
}
