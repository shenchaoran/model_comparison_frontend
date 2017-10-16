import { Resolve, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class DataToolService implements Resolve<any> {
    resolve() {
        return Promise.resolve();
    }

    constructor(private route: ActivatedRoute) {}
}
