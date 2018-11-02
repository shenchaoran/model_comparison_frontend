import { OlModule } from '../ol';
import { NgModule } from '@angular/core';
import { 
    HeaderMenuLayoutModule,
    NgxSharedModule,
    CustomTemplateModule,
    DirectivesModule,
    PipesModule,
} from '@shared';
import { 
    MatChipsModule, 
    MatIconModule, 
    MatProgressSpinnerModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatInputModule,
    MatButtonToggleModule,
} from '@angular/material';
// import {
//     // NzButtonModule,
//     // NzGridModule,
//     // NzTableModule,
//     // NzPaginationModule,
//     NgZorroAntdModule,
// } from 'ng-zorro-antd';
// import { NzCheckboxModule } from 'ng-zorro-antd';

import { ModelsRoutingModule } from './index-routing.module';
import { GeoModelDetailComponent } from './geo-model-detail/geo-model-detail.component';
import { GeoModelListComponent } from './geo-model-list/geo-model-list.component';
import { InvokeComponent } from './invoke/invoke.component';
import { CmpSharedModule } from '../cmp-shared';

export * from '@services';

const services = [];
const modules = [
    NgxSharedModule,
    ModelsRoutingModule,
    CmpSharedModule,
    OlModule,
    MatChipsModule, 
    MatIconModule, 
    MatProgressSpinnerModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatButtonToggleModule,
    MatInputModule,
    // NzButtonModule,
    // NzGridModule,
    // NzCheckboxModule,
    // NzTableModule,
    // NzPaginationModule,
    // NgZorroAntdModule,
    HeaderMenuLayoutModule,
    CustomTemplateModule,
    DirectivesModule,
    PipesModule,
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
