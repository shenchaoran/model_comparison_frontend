import {
    Directive,
    ElementRef,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[ogms-aside]'
})
export class AsideDirective {
    constructor(
        private el: ElementRef,
        private renderer2: Renderer2,
    ) {
        this.renderer2.addClass(this.el.nativeElement, 'ogms-aside');
    }
}
