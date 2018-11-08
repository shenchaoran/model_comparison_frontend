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
    MatGridListModule,
    MatTableModule,
} from '@angular/material';

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
    MatTableModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatGridListModule,
    MatButtonToggleModule,
    MatInputModule,
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
