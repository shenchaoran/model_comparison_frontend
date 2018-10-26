import {
    Directive,
    ElementRef,
    Renderer2,
} from '@angular/core';

// 左自适应有固定双栏布局
@Directive({
    selector: '[ogms-flex-1-0]'
})
export class Flex10Directive {

    constructor(
        private el: ElementRef,
        private renderer2: Renderer2
    ) {
        this.renderer2.addClass(this.el.nativeElement, 'flex-1-0');
        //   var children = this.el.nativeElement.querySelectorAll('>*');
        //   if(children.length === 2) {
        //       var left = children[0];
        //       var right = children[1];
        //       this.renderer2.addClass(left, '');
        //       this.renderer2.addClass(right, '');
        //   }
    }

}
