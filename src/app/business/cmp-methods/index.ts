import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    NgxSharedModule,
    HeaderMenuLayoutModule,
    PipesModule,
    DirectivesModule,
    CustomTemplateModule,
} from '@shared';
import {
    MatCardModule,
    MatRippleModule,
    MatButtonModule,
    MatCheckboxModule,
 } from '@angular/material';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';
import { CmpMethodsRoutingModule } from './cmp-methods-routing.module';
import { MethodDetailComponent } from './method-detail/method-detail.component';
import { MethodListComponent } from './method-list/method-list.component';
import { MasonryMethodsListComponent } from './masonry-methods-list/masonry-methods-list.component';

const components = [
    MethodDetailComponent,
    MethodListComponent,
    MasonryMethodsListComponent,
];
const entryComponents = [];
const exportComponents = [
    MethodListComponent,
    MasonryMethodsListComponent,
];
const modules = [
    NgxSharedModule,
    HeaderMenuLayoutModule,
    CmpMethodsRoutingModule,
    SimplemdeModule.forRoot(),
    PipesModule,
    DirectivesModule,
    MatCardModule,
    CustomTemplateModule,
    MatRippleModule,
    MatButtonModule,
    MatCheckboxModule,
];
const services = [];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    entryComponents: [...entryComponents],
    providers: [...services],
    exports: [...exportComponents],
})
export class CmpMethodsModule { }
