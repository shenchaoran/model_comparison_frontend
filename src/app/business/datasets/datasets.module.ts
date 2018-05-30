import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { VisualizationModule } from '../visualization/visualization.module';

import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { DatasetsRoutingModule } from './datasets-routing.module';
import { GeoDataComponent } from './geo-data/geo-data.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { IbisStdDataComponent } from './ibis-std-data/ibis-std-data.component';
import { BiomeStdDataComponent } from './biome-std-data/biome-std-data.component';
import { MetDataService } from './services/met-data.service';
import { StdDataService } from './services/std-data.service';
import { DataService } from './services/data.service';

@NgModule({
    imports: [
        SharedModule,
        VisualizationModule,
        DatasetsRoutingModule
    ],
    declarations: [
        GeoDataComponent,
        DatasetsComponent,
        IbisStdDataComponent,
        BiomeStdDataComponent,
    ],
    providers: [
        StdDataService,
        MetDataService,
        DataService,
        NzNotificationService,
    ]
})
export class DatasetsModule { }
