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



    @HostListener('window:scroll')
    onScroll(event: any) {
        const scrollH = Math.max(
            window.pageYOffset,
            window.scrollY,
            document.documentElement.scrollTop,
            document.body.scrollTop
        );
        const h = jQuery('#test')[0].offsetTop - scrollH;
        console.log(h);
        if (h < -500) {
            jQuery('#sider-nav').css('visibility', 'visible');
        } else {
            jQuery('#sider-nav').css('visibility', 'hidden');
        }
    }

    onScroll2(event: any) {
        // const scrollH = Math.max(
        //     window.pageYOffset,
        //     window.scrollY,
        //     document.documentElement.scrollTop,
        //     document.body.scrollTop
        // );
        const scrollH = jQuery('#container')[0].scrollTop;
        const h = jQuery('#test')[0].offsetTop - scrollH;
        console.log(h);
        if (h < -50) {
            jQuery('#sider-nav').css('visibility', 'visible');
        } else {
            jQuery('#sider-nav').css('visibility', 'hidden');
        }
    }
}
