import { NgModule } from '@angular/core';
import { 
    HeaderMenuLayoutModule,
    NgxSharedModule,
    DirectivesModule,
 } from '@shared';
import {

} from '@angular/material';
// import {

// } from 'ng-zorro-antd';

import { SearchComponent } from './search.component';
import { FiltersComponent } from './filters/filters.component';
import { SearchRoutingModule } from './index-routing.module';
import { ResultsComponent } from './results/results.component';

const modules = [
    NgxSharedModule,
    SearchRoutingModule,
    HeaderMenuLayoutModule,
    DirectivesModule,
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
