import { OnInit, OnDestroy } from '@angular/core';
import { map } from 'lodash';

export class OgmsBaseComponent implements OnDestroy {
    public _subscriptions = [];

    ngOnDestroy() {
        map(this._subscriptions as any[], sub => {
            sub.unsubscribe();
        })
    }
}
