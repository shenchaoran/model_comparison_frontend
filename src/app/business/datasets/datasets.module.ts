import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { VisualizationModule } from '../visualization/visualization.module';

import { DatasetsRoutingModule } from './datasets-routing.module';
import { GeoDataComponent } from './geo-data/geo-data.component';
import { DataService } from './services/data.service';

@NgModule({
    imports: [
        SharedModule,
        VisualizationModule,
        DatasetsRoutingModule
    ],
    declarations: [
        GeoDataComponent
    ],
    providers: [
        DataService
    ]
})
export class DatasetsModule { }
