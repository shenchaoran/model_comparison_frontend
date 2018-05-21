import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { ModelsRoutingModule } from './models-routing.module';
import { MSService } from './services/geo-models.service';
import { GeoModelDetailComponent } from './geo-model-detail/geo-model-detail.component';
import { GeoModelListComponent } from './geo-model-list/geo-model-list.component';
import { InvokeComponent } from './invoke/invoke.component';
import { CmpSharedModule } from '../cmp-shared';
import { LoginService } from '@feature/login/login.service';

export * from './services/geo-models.service';

@NgModule({
    imports: [
        SharedModule,
        ModelsRoutingModule,
        CmpSharedModule,
    ],
    declarations: [
        GeoModelDetailComponent,
        GeoModelListComponent,
        InvokeComponent
    ],
    providers: [
        MSService,
        LoginService
    ]
})
export class ModelsModule { }
