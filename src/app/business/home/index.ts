import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { MatSharedModule } from '@common/mat-shared';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './index-routing.module';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { PanelComponent } from './panel/panel.component';

const modules = [
    SharedModule,
    HomeRoutingModule,
    MatSharedModule,
];
const components = [
    HomeComponent,
    HomeBannerComponent,
    PanelComponent
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
