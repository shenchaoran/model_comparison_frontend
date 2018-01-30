import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSharedModule } from '@ngx-shared';
import { SharedModule } from '@shared';

import { GeoDataRoutingModule } from './geo-data-routing.module';
import { GeoDataComponent } from './geo-data.component';
import { DataTabsComponent } from './data-tabs/data-tabs.component';
import { DataIntroComponent } from './data-intro/data-intro.component';

import { DataService } from './services';
import { LoginService } from '../../common/feature/login/login.service';
import { DataBannerComponent } from './data-banner/data-banner.component';
import { DataSearchComponent } from './data-search/data-search.component';
import { DataListComponent } from './data-list/data-list.component';
import { DataListCardComponent } from './data-list-card/data-list-card.component';
import { DatasComponent } from './datas/datas.component';
import { DataInfoComponent } from './data-info/data-info.component';

import { MockService } from "../mock/mock.service";

const SERVICES = [
    DataService, 
    LoginService,
    MockService
];

@NgModule({
    imports: [NgxSharedModule, SharedModule, GeoDataRoutingModule],
    declarations: [GeoDataComponent, DataTabsComponent, DataIntroComponent, DataBannerComponent, DataSearchComponent, DataListComponent, DataListCardComponent, DatasComponent, DataInfoComponent],
    providers: [...SERVICES]
})
export class GeoDataModule {}
