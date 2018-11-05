import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';

@Component({
    selector: 'ogms-sider-nav',
    templateUrl: './sider-nav.component.html',
    styleUrls: ['./sider-nav.component.scss']
})
export class SiderNavComponent implements OnInit {
    constructor(private _renderer: Renderer2) {}

    ngOnInit() {
        // this._renderer.listen('window', 'scroll', () => {
        //     console.log('scroll');
        // });
    }
}
