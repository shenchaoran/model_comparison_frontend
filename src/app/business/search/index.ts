import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './search.component';
import { SharedModule } from '@common/shared';
import { FiltersComponent } from './filters/filters.component';
import { SearchRoutingModule } from './index-routing.module';
import { ResultsComponent } from './results/results.component';

const modules = [
    SharedModule,
    SearchRoutingModule,
];
const components = [
    SearchComponent,
    FiltersComponent,
    ResultsComponent,
];
const services = [];

@NgModule({
  imports: [...modules],
  declarations: [...components],
  providers: [...services]
})
export class SearchModule { }
