import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { JqxWidgetsModule } from '@common/jqx-widgets';

import { GeoModelRoutingModule } from './geo-model-routing.module';
import { GeoModelComponent } from './geo-model.component';
import { ModelTreeComponent } from './model-tree/model-tree.component';
import { ModelIntroComponent } from './model-intro/model-intro.component';

import { MSService } from './services';
import { NewModelComponent } from './new-model/new-model.component';
import { ModelBannerComponent } from './model-banner/model-banner.component';
import { ModelSearchComponent } from './model-search/model-search.component';
import { ModelListComponent } from './model-list/model-list.component';

import { MockService } from "../mock/mock.service";
import { ModelListCardComponent } from './model-list-card/model-list-card.component';
import { ModelInfoComponent } from './model-info/model-info.component';
import { ModelsComponent } from './models/models.component';

const SERVICES = [MSService];

@NgModule({
    imports: [
        SharedModule,
        JqxWidgetsModule,
        GeoModelRoutingModule
    ],
    declarations: [
        GeoModelComponent,
        // ModelTreeComponent,
        // ModelIntroComponent,
        // NewModelComponent,
        // ModelBannerComponent,
        // ModelSearchComponent,
        // ModelListComponent,
        // ModelListCardComponent,
        ModelInfoComponent,
        ModelsComponent
    ],
    providers: [
        MockService,
        ...SERVICES
    ]
})
export class GeoModelModule { }
