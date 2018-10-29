import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'lodash';

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
        map(this._subscriptions as any[], sub => {
            sub.unsubscribe();
        })
    }
}
