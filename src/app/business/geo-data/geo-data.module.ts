import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSharedModule } from '@ngx-shared';
import { SharedModule } from '@shared';

import { GeoDataRoutingModule } from './geo-data-routing.module';
import { GeoDataComponent } from './geo-data.component';
import { DataTabsComponent } from './data-tabs/data-tabs.component';
import { DataIntroComponent } from './data-intro/data-intro.component';

import { DataService } from './services';

const SERVICES = [DataService];

@NgModule({
    imports: [NgxSharedModule, SharedModule, GeoDataRoutingModule],
    declarations: [GeoDataComponent, DataTabsComponent, DataIntroComponent],
    providers: [...SERVICES]
})
export class GeoDataModule {}
