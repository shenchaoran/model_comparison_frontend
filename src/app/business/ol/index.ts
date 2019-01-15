import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@shared';

import { API } from '@config';
import { OlService } from './services/ol.service';
import { GridSiteComponent } from './grid-site/grid-site.component';
import { NcDatasetComponent } from './nc-dataset/nc-dataset.component';
import { SubRegionsComponent } from './sub-regions/sub-regions.component';
import { SelectedSitesComponent } from './selected-sites/selected-sites.component';
import { ObservationSiteComponent } from './observation-site/observation-site.component';
import {
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
} from '@angular/material';
////////////////////////////////////////////////////////////////////////////////
export * from './services/ol.service'
export * from './grid-site/grid-site.component'

const modules = [
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatListModule,
    MatChipsModule,
    MatCheckboxModule,
    NgxSharedModule,
];
const components = [
    GridSiteComponent,
    NcDatasetComponent,
    SubRegionsComponent,
    SelectedSitesComponent,
    ObservationSiteComponent,
];
var entryComponents = [];
const services = [
    OlService, 
    {
        provide: 'LAYERS',
        useValue: {
            url: `${API.geoserver}/Carbon_Cycle/wms`,
            workspace: 'Carbon_Cycle',
            bbox: [-179.75, -54.75, 179.75, 82.25]
        }
    },
];
var exportComponents = components;
@NgModule({
    imports: [...modules],
    declarations: [...components],
    entryComponents: [...entryComponents],
    providers: [...services],
    exports: [...exportComponents],
})
export class OlModule { }
