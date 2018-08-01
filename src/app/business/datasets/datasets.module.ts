import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
// import { VisualizationModule } from '../visualization/visualization.module';

import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { DatasetsRoutingModule } from './datasets-routing.module';
import { DatasetsComponent } from './datasets/datasets.component';
import { StdDataService } from './services/std-data.service';
import { DataService } from './services/data.service';
import { OlModule } from '../ol/ol.module';
import { SiteDataComponent } from './site-data/site-data.component'

@NgModule({
    imports: [
        SharedModule,
        // VisualizationModule,
        DatasetsRoutingModule,
        OlModule,

    ],
    declarations: [
        // GeoDataComponent,
        DatasetsComponent,
        // IbisStdDataComponent,
        SiteDataComponent,
    ],
    providers: [
        StdDataService,
        DataService,
        NzNotificationService,
    ]
})
export class DatasetsModule { }
