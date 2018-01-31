import { NgModule } from '@angular/core';
import { HotTableModule } from 'angular-handsontable';

import { WebNJGISRoutingModule } from './webNJGIS-routing.module';

import { NgxSharedModule } from '../common/ngx-shared';
import { SharedModule } from '../common/shared';

@NgModule({
	imports: [
		NgxSharedModule,
		SharedModule,
        WebNJGISRoutingModule,
        HotTableModule,
	],
	declarations: [],
	providers: [
	]
})

export class WebNJGISModule {}
