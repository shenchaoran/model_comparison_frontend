import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './index-routing.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { NguCarouselModule } from '@ngu/carousel';
import { 
    NgxSharedModule,
    HeaderMenuLayoutModule, 
    DirectivesModule,
} from '@shared';
import {
    MatIconModule,
} from '@angular/material';
import { PipesModule } from '@shared/pipes';

import { HomeComponent } from './home.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { PanelComponent } from './panel/panel.component';

const modules = [
    OverlayModule,
    NgxSharedModule,
    MatIconModule,
    NguCarouselModule,
    HomeRoutingModule,
    PipesModule,
    HeaderMenuLayoutModule,
    DirectivesModule,
];
const components = [
    HomeComponent,
    HomeBannerComponent,
    PanelComponent,
];
const services = [];
var exportComponents = [];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    providers: [...services],
    exports: [...exportComponents]
})
export class HomeModule { }
