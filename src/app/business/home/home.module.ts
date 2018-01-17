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
import { HomeModelComponent } from './home-model/home-model.component';
import { HomeModelCardComponent } from './home-model-card/home-model-card.component';
import { HomeDataComponent } from './home-data/home-data.component';
import { HomeDataCardComponent } from './home-data-card/home-data-card.component';
import { HomeSolutionComponent } from './home-solution/home-solution.component';
import { HomeSolutionCardComponent } from './home-solution-card/home-solution-card.component';

@NgModule({
  imports: [
    NgxSharedModule,
    SharedModule,

    FeatureRoutingModule,
  ],
  declarations: [HomeComponent, HomeBannerComponent, HomeTaskComponent, HomeStatisticsComponent, HomeTaskCardComponent, HomeModelComponent, HomeModelCardComponent, HomeDataComponent, HomeDataCardComponent, HomeSolutionComponent, HomeSolutionCardComponent],
  providers: [
    MockService
  ]
})
export class HomeModule { }
