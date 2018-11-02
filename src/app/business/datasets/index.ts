import { NgModule } from '@angular/core';
import { 
    HeaderMenuLayoutModule,
    NgxSharedModule,
    DirectivesModule,
} from '@shared';
import {

} from '@angular/material';
import {
    // NzMenuModule,
    NgZorroAntdModule,
} from 'ng-zorro-antd';

import { DatasetsRoutingModule } from './index-routing.module';
import { DatasetsComponent } from './datasets/datasets.component';
import { OlModule } from '../ol';
import { SiteDataComponent } from './site-data/site-data.component'

const modules = [
    NgxSharedModule,
    // NzMenuModule,
    NgZorroAntdModule,
    DatasetsRoutingModule,
    OlModule,
    HeaderMenuLayoutModule,
    DirectivesModule,
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
