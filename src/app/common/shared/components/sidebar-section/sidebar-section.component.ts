import { Component, OnInit, Input, Output, ContentChild, ContentChildren, ElementRef, AfterContentInit, HostListener, ViewChild, Renderer2 } from '@angular/core';

@Component({
    selector: 'ogms-sidebar-section',
    templateUrl: './sidebar-section.component.html',
    styleUrls: ['./sidebar-section.component.scss']
})
export class SidebarSectionComponent implements OnInit, AfterContentInit {
    // 此处必须在 light DOM 中声明
    @ContentChild('menu') menuRef: ElementRef;

    // shadow DOM
    @ViewChild('titleRef') titleRef: ElementRef;

    constructor(
        private el: ElementRef,
        private renderer2: Renderer2,
    ) { }

    ngOnInit() {
    }

    ngAfterContentInit() {
        // console.log(this.menuRef);
        
    }

    onHeaderClick(e) {
        if(!!this.menuRef) {
            this.renderer2.setStyle(this.menuRef.nativeElement, 'display', 'block');
        }
    }

    @HostListener('window:click', ['$event'])
    onclick(e) {
        if(!!this.menuRef) {
            if(this.titleRef.nativeElement.contains(e.target))
                return ;
            if(!this.menuRef.nativeElement.contains(e.target))
                this.renderer2.setStyle(this.menuRef.nativeElement, 'display', 'none');
        }
    }
}
