import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@shared';

import { API } from '@config';
import { OlService } from './services/ol.service';
import { GridSiteComponent } from './grid-site/grid-site.component';
import { NcDatasetComponent } from './nc-dataset/nc-dataset.component';
import { SubRegionsComponent } from './sub-regions/sub-regions.component';
import { SelectedSitesComponent } from './selected-sites/selected-sites.component';
import { ObservationSiteComponent } from './observation-site/observation-site.component';
import { SiteReplAppComponent } from './site-repl-app/site-repl-app.component';
import { SitesReplAppComponent } from './sites-repl-app/sites-repl-app.component';
import { RegionReplAppComponent } from './region-repl-app/region-repl-app.component';
import { OlRoutingModule } from './index-routing.module';
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
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatProgressSpinnerModule,
} from '@angular/material';
// import { TaskService } from '@services'
////////////////////////////////////////////////////////////////////////////////
export * from './services/ol.service'
export * from './grid-site/grid-site.component'

const modules = [
    MatRippleModule,
    MatRadioModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    NgxSharedModule,
    OlRoutingModule
];
const components = [
    GridSiteComponent,
    NcDatasetComponent,
    SubRegionsComponent,
    SelectedSitesComponent,
    ObservationSiteComponent,
    SiteReplAppComponent,
    SitesReplAppComponent,
    RegionReplAppComponent,
];
var entryComponents = [];
const services = [
    OlService,
    {
        provide: 'GEOSERVER_LAYER_WS',
        useValue: {
            url: `${API.geoserver}/Carbon_Cycle/wms`,
            workspace: 'Carbon_Cycle',
            bbox: [-179.75, -54.75, 179.75, 82.25]
        }
    },
    // TaskService,
];
var exportComponents = [
    GridSiteComponent,
    NcDatasetComponent,
    SubRegionsComponent,
    SelectedSitesComponent,
    ObservationSiteComponent,
];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    entryComponents: [...entryComponents],
    providers: [...services],
    exports: [...exportComponents],
})
export class OlModule { }
