import { Component, OnInit, Input, Output, Inject } from '@angular/core';

@Component({
    selector: 'ogms-server-side-diagram',
    templateUrl: './server-side-diagram.component.html',
    styleUrls: ['./server-side-diagram.component.scss']
})
export class ServerSideDiagramComponent implements OnInit {
    _v
    imgSrc
    @Input()
    set data(v) {
        this._v = v;
        this.imgSrc = `${this.api.backend}/images/std-plots/${v.img}`
    };
    get data() { return this._v; }
    constructor(
        @Inject('API') private api,
    ) { }

    ngOnInit() {
    }

}
