import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSharedModule } from '@ngx-shared';
import { SharedModule } from '@shared';

import { GeoDataRoutingModule } from './geo-data-routing.module';
import { GeoDataComponent } from './geo-data.component';
import { DataTabsComponent } from './data-tabs/data-tabs.component';
import { DataIntroComponent } from './data-intro/data-intro.component';

import { DataBannerComponent } from './data-banner/data-banner.component';
import { DatasComponent } from './datas/datas.component';
import { DataInfoComponent } from './data-info/data-info.component';

// import { AsciiGridComponent } from "../visualization/ascii-grid/ascii-grid.component";

import { DataService } from './services';
import { LoginService } from '../../common/feature/login/login.service';
import { MockService } from "../mock/mock.service";
// import { OlMapService } from '@feature/ol-map/ol-map.module.ts';
import { VisualizationModule } from "../visualization/visualization.module";

const SERVICES = [
    DataService, 
    LoginService,
    MockService,
    // OlMapService
];

@NgModule({
    imports: [NgxSharedModule, SharedModule, GeoDataRoutingModule, VisualizationModule],
    declarations: [GeoDataComponent, DataTabsComponent, DataIntroComponent, DataBannerComponent, DatasComponent, DataInfoComponent],
    providers: [...SERVICES]
})
export class GeoDataModule {}
