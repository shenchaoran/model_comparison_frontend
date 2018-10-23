import { Component, OnInit, Input, Output, ContentChild, ContentChildren, ElementRef, AfterContentInit, HostListener, Host } from '@angular/core';

@Component({
    selector: 'ogms-sidebar-section',
    templateUrl: './sidebar-section.component.html',
    styleUrls: ['./sidebar-section.component.scss']
})
export class SidebarSectionComponent implements OnInit, AfterContentInit {
    // 此处必须在 light DOM 中声明
    @ContentChild('menu') menuRef: ElementRef;
    showMenu: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    ngAfterContentInit() {
        console.log(this.menuRef);
        
    }

    onHeaderClick() {
        this.showMenu = true;
    }

    @HostListener('click', ['$event'])
    onclick(e) {
        this.showMenu = false;
    }
}
