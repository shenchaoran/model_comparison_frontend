import {
    Directive,
    ElementRef,
    Renderer2,
} from '@angular/core';

@Directive({
  selector: '[ogms-loading]'
})
export class LoadingDirective {
    constructor(
        private el: ElementRef,
        private renderer2: Renderer2,
    ) {
        this.renderer2.addClass(this.el.nativeElement, 'ogms-loading');
    }
}
