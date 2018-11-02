import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';
import { MapBaseComponent } from './map-base/map-base.component';

@NgModule({
    imports: [
        NgxSharedModule,
    ],
    declarations: [
        MapBaseComponent,
    ],
    exports: [
        MapBaseComponent,
    ]
})
export class MapModule { }
