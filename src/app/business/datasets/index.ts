import { NgModule } from '@angular/core';
import { 
    HeaderMenuLayoutModule,
    NgxSharedModule,
    DirectivesModule,
} from '@shared';
import {
    MatListModule,
    MatMenuModule,
    MatRippleModule,
} from '@angular/material';

import { DatasetsRoutingModule } from './index-routing.module';
import { DatasetsComponent } from './datasets/datasets.component';
import { OlModule } from '../ol';

const modules = [
    NgxSharedModule,
    MatListModule,
    MatRippleModule,
    DatasetsRoutingModule,
    OlModule,
    HeaderMenuLayoutModule,
    DirectivesModule,
];
const components = [
    // GeoDataComponent,
    DatasetsComponent,
    // IbisStdDataComponent,
    // SiteDataComponent,
];
const services = [];
var exportComponents = [];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    providers: [...services],
    exports: [...exportComponents]
})
export class DatasetsModule { }
