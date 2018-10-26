import { MatSharedModule } from '@mat-shared';
import { OlModule } from '../ol';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { ModelsRoutingModule } from './index-routing.module';
import { MSService } from '@services';
import { GeoModelDetailComponent } from './geo-model-detail/geo-model-detail.component';
import { GeoModelListComponent } from './geo-model-list/geo-model-list.component';
import { InvokeComponent } from './invoke/invoke.component';
import { CmpSharedModule } from '../cmp-shared';

export * from '@services';

const services = [];
const modules = [
    SharedModule,
    ModelsRoutingModule,
    CmpSharedModule,
    OlModule,
    MatSharedModule,
];
const components = [
    GeoModelDetailComponent,
    GeoModelListComponent,
    InvokeComponent,
];

@NgModule({
    imports: [...modules],
    declarations: [...components],
    providers: [...services]
})
export class ModelsModule { }
