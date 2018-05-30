import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './search.component';
import { SharedModule } from '@shared';
import { FiltersComponent } from './filters/filters.component';
import { SearchRoutingModule } from './search-routing.module';
import { ResultsComponent } from './results/results.component';
import { SearchService } from './services';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

@NgModule({
  imports: [
    SharedModule,
    SearchRoutingModule
  ],
  declarations: [
    SearchComponent,
    FiltersComponent,
    ResultsComponent
  ],
  providers: [
    SearchService,
    NzNotificationService
  ]
})
export class SearchModule { }
