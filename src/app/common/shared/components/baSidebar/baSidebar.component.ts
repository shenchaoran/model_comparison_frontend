import { Component, Input, ElementRef, HostListener } from '@angular/core';
// import { GlobalState } from '../../../../global.state';
import { layoutSizes } from '../../theme/theme.constants';
import { APP_CONFIG } from '@config/app.config';

// import { BaMenuService } from '../../services/baMenu/baMenu.service';

@Component({
	selector: 'ba-sidebar',
	templateUrl: './baSidebar.component.html',
	styleUrls: ['./baSidebar.component.scss']
})
export class BaSidebar {
	@Input() title: string;

	public menuHeight: number;
	public isMenuCollapsed: boolean = false;
	public isMenuShouldCollapsed: boolean = false;

	constructor(private _elementRef: ElementRef, 
		// private _state: GlobalState, 
		// private _menuService: BaMenuService
	) {
		// this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
		// 	this.isMenuCollapsed = isCollapsed;
		// });
		postal.channel('MENU_CHANNEL').subscribe('menu.isCollapsed', (data, envelope) => {
			this.isMenuCollapsed = data.isCollapsed;
		});
	}

	public ngOnInit(): void {
		if (this._shouldMenuCollapse()) {
			this.menuCollapse();
		}

		if(this.title === undefined){
			this.title = APP_CONFIG.name;
		}

		// this._menuService.updateMenu();
		postal.channel('MENU_CHANNEL').publish('menu.update');
	}

	public ngAfterViewInit(): void {
		setTimeout(() => this.updateSidebarHeight());
	}

	@HostListener('window:resize')
	public onWindowResize(): void {

		let isMenuShouldCollapsed = this._shouldMenuCollapse();

		if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
			this.menuCollapseStateChange(isMenuShouldCollapsed);
		}
		this.isMenuShouldCollapsed = isMenuShouldCollapsed;
		this.updateSidebarHeight();
	}

	public menuExpand(): void {
		this.menuCollapseStateChange(false);
	}

	public menuCollapse(): void {
		this.menuCollapseStateChange(true);
	}

	public menuCollapseStateChange(isCollapsed: boolean): void {
		this.isMenuCollapsed = isCollapsed;
		// this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
		postal.channel('MENU_CHANNEL').publish('menu.isCollapsed', {isCollapsed: isCollapsed});
	}

	public updateSidebarHeight(): void {
		this.menuHeight = this._elementRef.nativeElement.childNodes[0].clientHeight - 84 - 32;
	}

	private _shouldMenuCollapse(): boolean {
		return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
	}
}
