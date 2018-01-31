import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@ngx-shared';
import { SharedModule } from '@shared';

import { HomeComponent } from './home.component';
import { FeatureRoutingModule } from './home-routing.module';
import { HomeBannerComponent } from './home-banner/home-banner.component';

import { MockService } from "../mock/mock.service";
import { HomeTaskComponent } from './home-task/home-task.component';
import { HomeStatisticsComponent } from './home-statistics/home-statistics.component';
import { HomeModelComponent } from './home-model/home-model.component';
import { HomeSolutionComponent } from './home-solution/home-solution.component';

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,
    FeatureRoutingModule,
  ],
  declarations: [HomeComponent, HomeBannerComponent, HomeTaskComponent, HomeStatisticsComponent, HomeModelComponent, HomeSolutionComponent],
  providers: [
    MockService
  ]
})
export class HomeModule { }
