import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { MatSharedModule } from '@common/mat-shared';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { PanelComponent } from './panel/panel.component';

import {
    MSRService,
    SlnService,
    TaskService,
    DatasetService,
    MSService,
} from '@services';

@NgModule({
    imports: [
        SharedModule,
        HomeRoutingModule,
        MatSharedModule,
    ],
    declarations: [
        HomeComponent,
        HomeBannerComponent,
        PanelComponent
    ],
    providers: [
        MSRService,
        MSService,
        DatasetService,
        TaskService,
        SlnService,
    ]
})
export class HomeModule { }
