import {
    Directive,
    ElementRef,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[ogms-rx-box]'
})
export class RxBoxDirective {
    constructor(
        private el: ElementRef, 
        private renderer2: Renderer2
    ) {
        this.renderer2.addClass(this.el.nativeElement, 'rx-box');
    }
}
