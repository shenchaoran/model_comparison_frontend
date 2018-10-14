import { MatSharedModule } from '@common/mat-shared';
import { OlModule } from '../ol';
import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';

import { ModelsRoutingModule } from './models-routing.module';
import { MSService, UserService } from '@services';
import { GeoModelDetailComponent } from './geo-model-detail/geo-model-detail.component';
import { GeoModelListComponent } from './geo-model-list/geo-model-list.component';
import { InvokeComponent } from './invoke/invoke.component';
import { CmpSharedModule } from '../cmp-shared';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';

export * from '@services';

@NgModule({
    imports: [
        SharedModule,
        ModelsRoutingModule,
        CmpSharedModule,
        OlModule,
        MatSharedModule,
    ],
    declarations: [
        GeoModelDetailComponent,
        GeoModelListComponent,
        InvokeComponent,
    ],
    providers: [
        MSService,
        UserService,
        NzNotificationService
    ]
})
export class ModelsModule { }
