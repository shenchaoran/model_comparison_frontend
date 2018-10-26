import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { DatasetsRoutingModule } from './index-routing.module';
import { DatasetsComponent } from './datasets/datasets.component';
import { OlModule } from '../ol';
import { SiteDataComponent } from './site-data/site-data.component'

const modules = [
    SharedModule,
    DatasetsRoutingModule,
    OlModule,
];
const components = [
    // GeoDataComponent,
    DatasetsComponent,
    // IbisStdDataComponent,
    SiteDataComponent,
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
