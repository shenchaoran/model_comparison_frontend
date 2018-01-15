import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared';
import { SharedModule } from '@shared';

import { HomeComponent } from './home.component';
import { FeatureRoutingModule } from './home-routing.module';
import { HomeBannerComponent } from './home-banner/home-banner.component';

import { MockService } from "../mock/mock.service";
import { HomeTaskComponent } from './home-task/home-task.component';
import { HomeStatisticsComponent } from './home-statistics/home-statistics.component';
import { HomeTaskCardComponent } from './home-task-card/home-task-card.component';

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,

    FeatureRoutingModule,
  ],
  declarations: [HomeComponent, HomeBannerComponent, HomeTaskComponent, HomeStatisticsComponent, HomeTaskCardComponent],
  providers: [
    MockService
  ]
})
export class HomeModule { }
