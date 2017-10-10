import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { BaMenuService } from './services/baMenu.service';
// import { ModulesConfigService } from '../../services/modules.config.service';
// import { GlobalState } from '../../../../global.state';

@Component({
	selector: 'ba-menu',
	templateUrl: './baMenu.component.html',
	styleUrls: ['./baMenu.component.scss'],
	providers: [BaMenuService]
})
export class BaMenu {
	@Input() title: String;
	@Input() sidebarCollapsed: boolean = false;
	@Input() menuHeight: number;

	@Output() expandMenu = new EventEmitter<any>();

	private moduleEncode: string = 'sidebar';
	private moduleFunctions: any;

	public menuItems: any[];
	protected _menuItemsSub: Subscription;
	public showHoverElem: boolean;
	public hoverElemHeight: number;
	public hoverElemTop: number;
	protected _onRouteChange: Subscription;

	public isMenuCollapsed: boolean = false;
	public hoverMenuItem: any;

	constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
		private _service: BaMenuService,
		// private _state: GlobalState, private modulesConfigService: ModulesConfigService
	) {
	}

	public updateMenu(newMenuItems) {
		this.menuItems = newMenuItems;
		this.selectMenuAndNotify();

		// let modulesConfig = this._activatedRoute.snapshot.data['modulesConfigService'];
		// if (modulesConfig) {
		// 	this.modulesConfigService.getModuleFunctions(null, this.moduleEncode).then((moduleFunctions) => {
		// 		this.moduleFunctions = moduleFunctions;

		// 		this.filterMenuItems(this.menuItems, this.moduleFunctions);
		// 	});
		// } else {
		// 	console.error('#baMenu.component#modulesConfig is undefined');
		// }
	}

	public selectMenuAndNotify(): void {
		if (this.menuItems) {
			this.menuItems = this._service.selectMenuItem(this.menuItems);
		}
	}

	public ngOnInit(): void {
		this._onRouteChange = this._router.events.subscribe((event) => {

			if (event instanceof NavigationEnd) {
				if (this.menuItems) {
					this.selectMenuAndNotify();
				} else {
					// on page load we have to wait as event is fired before menu elements are prepared
					setTimeout(() => this.selectMenuAndNotify());
				}
			}
		});

		this._menuItemsSub = this._service.menuItems.subscribe(this.updateMenu.bind(this));
	}

	public ngOnDestroy(): void {
		this._onRouteChange.unsubscribe();
		this._menuItemsSub.unsubscribe();

		// this._state.notifyDataChanged('menu.isCollapsed', false);
		postal.channel('MENU_CHANNEL').publish('menu.isCollapsed', {isCollapsed: false});
		
	}

	public hoverItem(data: any): void {
		if (this.sidebarCollapsed) {
			this.hoverElemTop = data.event.currentTarget.getBoundingClientRect().top;
			this.hoverMenuItem = data.items;
			jQuery('#div_hover').show();
			jQuery('aside .active').removeClass('active');
			jQuery(data.event.currentTarget).parent().addClass('active');
		}
	}
	public onLeaveSubItem($event): void {
		jQuery('#div_hover').hide();
		jQuery('aside .active').removeClass('active');
	}

	public toggleMenu() {
		this.isMenuCollapsed = !this.isMenuCollapsed;
		// this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
		postal.channel('MENU_CHANNEL').publish('menu.isCollapsed', {isCollapsed: this.isMenuCollapsed});
	}

	public toggleSubMenu($event): boolean {
		if (this.sidebarCollapsed) {
			this.expandMenu.emit(null);
			if (!$event.item.expanded) {
				$event.item.expanded = true;
			}
		} else {
			$event.item.expanded = !$event.item.expanded;

			let submenu = jQuery($event.currentTarget).next();
			submenu.slideToggle();
		}

		return false;
	}

	public filterMenuItems(menuItems, moduleFunctions) {
		//从右边循环避免pull后索引错误
		_.forEachRight(menuItems, (item) => {
			if (_.some(moduleFunctions, ['encode', item.id])) {

				if (item.children) {
					let childModuleFunctions = _.find(moduleFunctions, (o) => {
						return o.encode === item.id;
					})

					this.filterMenuItems(item.children, childModuleFunctions.children);
				}
			} else {
				_.pull(menuItems, item);
			}
		})
	}
}
