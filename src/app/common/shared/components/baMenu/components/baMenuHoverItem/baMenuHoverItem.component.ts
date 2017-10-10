import { puts } from 'util';
import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
@Component({
	selector: 'ba-menu-hover-item',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './baMenuHoverItem.component.html',
	styleUrls: ['./baMenuHoverItem.component.scss']
})
export class BaMenuHoverItem {

	@Input() menuItem: any;
	@Input() child: boolean = false;

	@Output() itemHover = new EventEmitter<any>();
	@Output() itemLeave = new EventEmitter<any>();
	@Output() toggleSubMenu = new EventEmitter<any>();
	@Output() hoverTop = new EventEmitter<number>();
	public activeClick: boolean = false;
	public hoverSubElemTop: number;

	ngOnInit() {
	}

	ngAfterViewInit() {

	}
	public onHoverItem($event, item): void {
		this.itemHover.emit($event);
	}
	
	public onHoverSubItem($event): void {
		let activeSubMenu = jQuery($event.currentTarget);
		activeSubMenu.addClass("activeSub");
	}

	public onLeaveSubMenu($event): void {
		let activeSubMenu = jQuery($event.currentTarget);
		activeSubMenu.removeClass("activeSub");
	}

	public onToggleSubMenu($event, item): boolean {
		$event.item = item;
		this.toggleSubMenu.emit($event);
		return false;
	}
}
