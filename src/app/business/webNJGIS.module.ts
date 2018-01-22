import { NgModule } from '@angular/core';
import { HotTableModule } from 'angular-handsontable';

import { WebNJGISRoutingModule } from './webNJGIS-routing.module';

import { NgxSharedModule } from '../common/ngx-shared';
import { SharedModule } from '../common/shared';
import { LayoutModule } from '../common/layout/layout.module';

@NgModule({
	imports: [
		NgxSharedModule,
		SharedModule,
		LayoutModule,
        WebNJGISRoutingModule,
        HotTableModule,
	],
	declarations: [

	],
	providers: [
	]
})

export class WebNJGISModule {}
