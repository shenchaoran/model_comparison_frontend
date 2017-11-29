import { NgModule } from '@angular/core';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

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
	],
	declarations: [

	],
	providers: [
        { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzDuration: 3000, nzTop: '60px' } },
        NzNotificationService,
	]
})

export class WebNJGISModule {}
