import { Component, ViewContainerRef, OnInit } from '@angular/core';

// import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './common/core/services';
// import { BaThemeConfig } from './common/core/theme/theme.config';
import { layoutPaths } from './common/shared/theme/theme.constants';

/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class App implements OnInit {

	isMenuCollapsed: boolean = false;

	constructor(
		private _imageLoader: BaImageLoaderService,
		private _spinner: BaThemeSpinner,
		private viewContainerRef: ViewContainerRef,
		// private themeConfig: BaThemeConfig
	) {

			// themeConfig.config();

			// this._loadImages();

			// this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
			// 	this.isMenuCollapsed = isCollapsed;
			// });
			postal.channel('MENU_CHANNEL').subscribe('menu.isCollapsed', (data, envelope) => {
				this.isMenuCollapsed = data.isCollapsed;
			});
        }
        
    ngOnInit() {
    }

	public ngAfterViewInit(): void {
		// hide spinner once all loaders are completed
		BaThemePreloader.load().then((values) => {
			this._spinner.hide();
        });
        
	}

	// private _loadImages(): void {
	// 	// register some loaders
	// 	BaThemePreloader.registerLoader(this._imageLoader.load('/assets/img/sky-bg.jpg'));
	// }

}
