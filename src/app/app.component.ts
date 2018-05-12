import { Component, ViewContainerRef, OnInit } from '@angular/core';

import { GlobalState } from './global.state';
import {
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner
} from './common/shared/services';
import { BaThemeConfig } from './common/shared/theme.config';
import { layoutPaths } from './common/shared/theme.constants';
import { DynamicTitleService } from '@core/services/dynamic-title.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'ogms-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class App implements OnInit {
  isMenuCollapsed: boolean = false;
  select

  constructor(
    private _state: GlobalState,
    private _imageLoader: BaImageLoaderService,
    private _spinner: BaThemeSpinner,
    private viewContainerRef: ViewContainerRef,
    private themeConfig: BaThemeConfig,
    private title: DynamicTitleService
  ) {
    themeConfig.config();

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    postal
      .channel('MENU_CHANNEL')
      .subscribe('menu.isCollapsed', (data, envelope) => {
        this.isMenuCollapsed = data.isCollapsed;
      });
  }

  ngOnInit() {}

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load('assets/img/sky-bg.jpg'));
  }
}
