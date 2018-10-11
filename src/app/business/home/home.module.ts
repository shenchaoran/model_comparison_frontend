import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@common/ngx-shared';
import { SharedModule } from '@common/shared';

import { HomeComponent } from './home.component';
import { FeatureRoutingModule } from './home-routing.module';
import { HomeBannerComponent } from './home-banner/home-banner.component';

import { MockService } from "./mock/mock.service";
import { HomeTaskComponent } from './home-task/home-task.component';
import { HomeStatisticsComponent } from './home-statistics/home-statistics.component';
import { HomeModelComponent } from './home-model/home-model.component';
import { HomeSolutionComponent } from './home-solution/home-solution.component';
import { HomeIssueComponent } from './home-issue/home-issue.component';
import { PanelComponent } from './panel/panel.component';

import {
    MSRService,
    SlnService,
    TaskService,
    DatasetService,
    MSService,
} from '../services';

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,
    FeatureRoutingModule,
  ],
  declarations: [HomeComponent, HomeBannerComponent, HomeTaskComponent, HomeStatisticsComponent, HomeModelComponent, HomeSolutionComponent, HomeIssueComponent, PanelComponent],
  providers: [
    MockService,
    MSRService,
    MSService,
    DatasetService,
    TaskService,
    SlnService,
  ]
})
export class HomeModule { }
